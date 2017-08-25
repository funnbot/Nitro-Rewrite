const Util = require("./util.js")

/**
 * Manage user balance.
 * @class
 */
class MoneyManager {
    constructor(user, guild) {
        this.user = user;
        this.client = user.client;
        this.guild = guild;
    }
    
    get() {
        let users = guild.get("Economy", "users")
        return users[id] ? users[id].money || 0 : 0
    }

    dset(amount) {
        amount = Util.round100(amount)
        id = Util.parseID(id)
        let users = this.guild.get("Economy", "users")
        if (!users[id]) users[id] = {}
        users[id].money = amount
        this.guild.set("Economy", "users", users)
        return users[id].money
    }

    add(amount) {
        id = Util.parseID(id);
        let users = this.guild.get("Economy", "users")
        if (!users[id]) users[id] = {}
        users[id].money = (users[id].money || 0) + amount
        users[id].money = Util.round100(users[id].money)
        guild.set("Economy", "users", users)
        return users[id].money
    }
}

module.exports = MoneyManager;