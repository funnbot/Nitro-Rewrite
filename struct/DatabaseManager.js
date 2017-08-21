const { Collection } = require("discord.js");
const { TABLES } = require("../config.js")
let r = require("rethinkdbdash")();

class TableManager {
    constructor(client, table, isGuild) {
        //The client
        this.client = client;

        //Table to read from
        this.table = table;

        //Whether to filter out guilds the shard cannot see and disabled changeFeed
        this.isGuild = isGuild;

        //Update queue
        this.queue = {};

        //Table cached in memory
        this.cache = new Collection();

        //Defaults
        this.def = TABLES[this.table];

        //Load table into cache
        this.loadTable();

        //Change feed to keep shards matching
        this.changeFeedListener();

        //Loop insert queue
        this.insertQueue();

        //Save on ctl+c
        this.saveOnKill();
    }

    get(id, nestedValue) {
        id = this.parseID(id)
        if (!id) id = "1234"

        let data = this.cache.get(id);
        if (data === undefined) {
            //Handle based on default
            if (nestedValue === undefined) {
                return this.def instanceof Object ? {} : this.def
            } else {
                return this.def[nestedValue] === undefined ? null : this.def[nestedValue]
            }
        } else {
            //Data is stored
            if (nestedValue === undefined) {
                return data
            } else {
                if (this.def[nestedValue] === undefined) return null
                else {
                    return data[nestedValue] === undefined ? this.def[nestedValue] : data[nestedValue]
                }
            }
        }
    }

    set(id, nestedValue, newData) {
        if (nestedValue === "all") return this.cache
        if (nestedValue === undefined) throw new Error("newData is undefined");
        if (newData === undefined) newData = nestedValue

        id = this.parseID(id);
        if (!id) throw new Error("Invalid ID: " + id)

        let data = this.cache.get(id);

        let checkNested = newData !== undefined && this.def[nestedValue] !== undefined;
        if (checkNested) {
            if (!data) data = {}
            data[nestedValue] = newData;
        } else data = newData;

        this.cache.set(id, data)
        this.update(id)
        return true;
    }

    update(id) {
        let data = this.cache.get(id)
        if (data === undefined) this.queue[id] = {id}
        this.queue[id] = {id, data}
    }

    async insertQueue() {
        try {
            await this._table.insert(Object.values(this.queue), {
                conflict: "replace"
            })
            this.queue = {}
        } catch (e) {
            console.log(e)
        }
        setTimeout(() => this.insertQueue(), 5e3)
    }

    saveOnKill() {
        process.on("SIGINT", async() => {
            try {
                await this.insertQueue()
                console.log(" Saved")
            } catch (err) {
                console.log(" Failed to save")
            }
            process.exit(1)
        });
    }

    loadTable() {
        this._table.then(fromTable => {
            for (let { id, data } of fromTable) {
                if (this.isGuild && !this.client.guilds.has(id)) continue;
                this.cache.set(id, data)
            }
        })
    }

    changeFeedListener() {
        if (this.isGuild) return
        this._table.changes.then(feed => {
            feed.each((err, row) => {
                if (err) return console.log(err)
                let val = row.new_val
                if (!val || !val.id || !val.data) return
                this.cache.set(val.id, val.data)
            })
        })
    }

    parseID(i) {
        if (i.id) i = i.id;
        i = i.replace(/[^0-9]/g, "");
        let regex = /^.{17,18}$/;
        if (!regex.test(i)) return null;
        return i;
    }

    get _table() {
        return r.table(this.table);
    }
}

class DatabaseManager {
    constructor(client) {
        this.tables = {};
        this.client = client;
    }

    add(table, isGuild) {
        this.tables[table] = new TableManager(this.client, table, isGuild);
    }

    table(table) {
        return this.tables[table];
    }

    async createDB() {
        let dbs = await r.dbList();
        if (!dbs.includes("Nitro")) {
            await r.dbCreate("Nitro");
        }
        r = r.db("Nitro");

        await this._createTables();
        return;
    }

    async _createTables() {
        let tables = await r.tableList();
        let neededTables = Object.keys(TABLES);
        for (let t of neededTables) {
            if (!tables.includes(t)) await r.tableCreate(t);
        }
        return;
    }
}
module.exports = DatabaseManager