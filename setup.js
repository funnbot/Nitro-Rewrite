const tables = Object.keys(require("./config").DEFAULTS)

const r = require("rethinkdbdash")()

console.log("running")
async function setup() {
    async function createDbs(existingDbs) {
        if (existingDbs.includes("Nitro")) {
            createTables(await r.db("Nitro").tableList().run())
        } else {
            console.log("creating a database called Nitro")
            r.dbCreate("Nitro").run(() => {
                createDbs(["Nitro"])
            })
        }
    }

    function createTables(existingTables) {
        for (const table of tables) {
            if (!existingTables.includes(table)) {
                console.log("created a table called " + table)
                r.db("Nitro").tableCreate(table).run()
            }
        }
    }

    createDbs(await r.dbList().run())
}
setup()