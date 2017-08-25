const Extension = require("./Extension.js");

class GuildExtension extends Extension {

    /**
     * Get values from the database.
     * @param {String} table 
     * @param {String} nestedValue 
     * @returns {*}
     */
    get(table, nestedValue) {
        return this.table(table).get(this.id, nestedValue)
    }

    /**
     * Set values to the database.
     * @param {String} table
     * @param {String} nestedValue 
     * @param {*} newData 
     */
    set(table, nestedValue, newData) {
        return this.table(table).set(this.id, nestedValue, newData)
    }

    /**
     * Get a table
     * @param {String} table 
     * @returns {Object} TableManager
     */
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