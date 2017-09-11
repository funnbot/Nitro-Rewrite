const Extension = require("./Extension.js");
const SimpleStorage = require("../struct/SimpleStorage.js");

class User extends Extension {

    get(table, nestedValue) {
        return this.table(table).get(this.id, nestedValue)
    }

    set(table, nestedValue, newData) {
        return this.table(table).set(this.id, nestedValue, newData)
    }

    table(table) {
        return this.client.table(table)
    }

    get storage() {
        if (!this.SimpleStorage) this.SimpleStorage = new SimpleStorage(this.client, this.id, "user");
        return this.SimpleStorage
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

module.exports = User