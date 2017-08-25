const Extension = require("./Extension.js");

class UserExtension extends Extension {

    get(table, nestedValue) {
        return this.table(table).get(this.id, nestedValue)
    }

    set(table, nestedValue, newData) {
        return this.table(table).set(this.id, nestedValue, newData)
    }

    table() {
        return this.client.table(table)
    }

    add(key, value) {
        if (!this.client.active.user[key]) this.client.active.user[key] = {}
        this.client.active.user[key][this.id] = value || true
    }

    check(key) {
        if (!this.client.active.user[key]) this.client.active.user[key] = {}
        return this.client.active.user[key][this.id] || null
    }

    del(key) {
        if (!this.client.active.user[key]) this.client.active.user[key] = {}
        return delete this.client.active.user[key][this.id]
    }

    purge(key) {
        return delete this.client.active.user[key]
    }

}

module.exports = UserExtension