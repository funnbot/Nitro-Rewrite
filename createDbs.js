const { TABLES, DBNAME } = require("./config.js");
const { RETHINKDBPASS } = require("./auth.js");
let r = require("rethinkdbdash")({
    //password: RETHINKDBPASS
});

async function createDB() {
    let dbs = await r.dbList();
    if (!dbs.includes(DBNAME)) {
        await r.dbCreate(DBNAME);
    }
    r = r.db(DBNAME);
    console.log("Created DB: " + DBNAME);
    await createTables();
    return;
}

async function createTables() {
    let tables = await r.tableList();
    let neededTables = Object.keys(TABLES);
    for (let t of neededTables) {
        if (!tables.includes(t)) {
            await r.tableCreate(t);
            console.log("Created Table: " + t);
        }
    }
    return;
}

async function start() {
    await createDB();
    process.exit("Success!")
}

start();