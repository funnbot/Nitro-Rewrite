const Extension = require("./Extension.js")

class GuildExtension extends Extension {

    get(table, nestedValue) {
        return this.table(table).get(this.id, nestedValue)
    }

    set(table, nestedValue, newData) {
        return this.table(table).set(this.id, nestedValue, newData)
    }

    table(table) {
        return this.client.table(table)
    }

    add(key, value) {
        if (!this.client.active.guild[key]) this.client.active.guild[key] = {}
        this.client.active.guild[key][this.id] = value || true
    }

    check(key) {
        if (!this.client.active.guild[key]) this.client.active.guild[key] = {}
        return this.client.active.guild[key][this.id] || null
    }

    del(key) {
        if (!this.client.active.guild[key]) this.client.active.guild[key] = {}
        return delete this.client.active.guild[key][this.id]
    }

    purge(key) {
        return delete this.client.active.guild[key]
    }

}

module.exports = GuildExtension