const r = require("rethinkdbdash")({
    db: "Nitro"
})
const {
    DEFAULTS
} = require("../config.js")

class DatabaseManager {
    constructor(key) {
        //The Table of this database
        this.key = key
        //All settings are cached here
        this.settings = {}
        //When a setting is updated, its pushed to queue, every 5 seconds the queue is inserted
        this.queue = []
        //Cached database on start
        r.table(key).run().then(res => {
            res.forEach(k => {
                this.settings[k.id] = k.data
            })
        }).catch(console.log)
        //Change feed
        r.table(key).changes().run().then(feed => {
            feed.each((err, row) => {
                if (err) return console.log(err)
                if (!row.new_val) return
                this.settings[row.new_val.id] = row.new_val.data
            })
        })
        //The insterQueue loop, 5 seconds
        let loop = async() => {
            await this.insertQueue()
            setTimeout(() => loop(), 5e3)
        }
        loop()
    }

    async insertQueue() {
        try {
            await r.table(this.key).insert(this.queue, {
                conflict: "replace"
            }).run()
        } catch (err) {
            console.log(err)
        }
        return this.queue = []
    }

    update(id) {
        this.queue.push({
            id,
            data: this.settings[id]
        })
    }

    g(id) {
        id = this.getId(id)
        return this.settings[id] ? this.settings[id] : DEFAULTS[this.key]
    }

    s(id, val) {
        id = this.getId(id)
        this.settings[id] = val
        this.update(id)
    }

    gKey(id, key) {
        id = this.getId(id)
        if (!this.settings[id] || !this.settings[id][key]) return {}
        return this.settings[id][key]
    }

    sKey(id, key, val) {
        id = this.getId(id)
        if (!this.settings[id]) this.settings[id] = {}
        this.settings[id][key] = val
        this.update(id)
    }

    getId(i) {
        if (!i) return "1234"
        if (i.id) return i.id
        return i
    }
}

module.exports = DatabaseManager