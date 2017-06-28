const r = require('rethinkdbdash')({ db: "Nitro" })
const { DEFAULTS } = require('../config.js')

class DatabaseManager {

    constructor(key) {

        this.key = key

        this.settings = {}

        r.table(key).run().then(res => {

            res.forEach(k => {

                this.settings[k.id] = k.data

            })

        })

        r.table(key).changes().run().then(change => {

            

        })

    }

    get(id) {

        return this.settings[id] ? this.settings[id] : DEFAULTS[this.key]

    }

    set(id, val) {

        this.settings[id] = val

    }

}

module.exports = DatabaseManager