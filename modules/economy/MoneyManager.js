const bot = require("./bot.js")

class MoneyManager {
    getMoney(guild, id) {
        if (!guild) return 0
        if (guild.id) id = guild.id
        let users = bot.economy.gKey(guild, "users")
        if (!users[id] || !users[id].money) return 0
        return users[id].money
    }
    setMoney(guild, id, bal) {
        if (!guild) return false
        if (guild.id) id = guild.id
        let users = bot.economy.gKey(guild, "users")
        if (!users[id]) users[id] = {}
        users[id].money = bal
        return users[id].money
    }
    addMoney(guild, id, money) {
        if (!guild) return false
        if (guild.id) id = guild.id
        let users = bot.economy.gKey(guild, "users")
        if (!users[id]) users[id] = {}
        if (!users[id].money) user[id].money = money
        else users[id].money = users[id].money + money
        users[id].money = bal
        return users[id].money
    }
}

module.exports = MoneyManager