const Extension = require("./Extension.js")

class ChannelExtension extends Extension {

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
        if (!this.client.active.channel[key]) this.client.active.channel[key] = {}
        this.client.active.channel[key][this.id] = value || true
    }

    check(key) {
        if (!this.client.active.channel[key]) this.client.active.channel[key] = {}
        return this.client.active.channel[key][this.id] || null
    }

    del(key) {
        if (!this.client.active.channel[key]) this.client.active.channel[key] = {}
        return delete this.client.active.channel[key][this.id]
    }

    purge(key) {
        return delete this.client.active.channel[key]
    }

}

module.exports = ChannelExtension