const bot = require("./bot.js")
const Nitro = require("../../Nitro.js")

class MoneyManager {
    getTop(guild) {
        guild = this.getId(guild)
        let users = bot.economy.gKey(guild, "users")
        users = Object.entries(users).sort(([an, ak], [bn, bk]) => {
            return (bk.money || 0) - (ak.money || 0)
        })
        return users
    }

    getMoney(guild, id) {
        guild = this.getId(guild)
        id = this.getId(id)
        let users = bot.economy.gKey(guild, "users")
        if (!users[id] || !users[id].money) return 0
        return users[id].money
    }

    setMoney(guild, id, bal) {
        guild = this.getId(guild)
        id = this.getId(id)
        let users = bot.economy.gKey(guild, "users")
        if (!users[id]) users[id] = {}
        users[id].money = bal
        bot.economy.sKey(guild, "users", users)
        return users[id].money
    }

    addMoney(guild, id, money) {
        guild = this.getId(guild)
        id = this.getId(id)
        let users = bot.economy.gKey(guild, "users")
        if (!users[id]) users[id] = {}
        if (!users[id].money) users[id].money = money
        else users[id].money = users[id].money + money
        users[id].money = Nitro.util.round100(users[id].money)
        bot.economy.sKey(guild, "users", users)
        return users[id].money
    }

    getId(i) {
        if (!i) return "1234"
        if (i.id) return i.id
        return i
    }
}

module.exports = MoneyManager