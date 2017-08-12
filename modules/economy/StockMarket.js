const bot = require("./bot.js")
const { STOCKS } = require("../../config.js")
const Nitro = require("../../Nitro.js")

module.exports = class StockMarket {
    constructor() {
        this.stocks = STOCKS
        this.ms = this._genMappedStocks()
        this._genWorth()

        this._loop()
    }

    sell(guild, user, type, am) {
        let bal = bot.moneyman.getMoney(guild, user)
        let s = this.ms[type] || "Alfred"
        let price = this.stocks[s].price * am
        let stock = this._getOwned(guild, user)
        if (!stock[type] || am > stock[type]) return "You do not own these stocks."
        stock[type] = stock[type] - am
        if (stock[type] === 0) delete stock[type]
        bot.moneyman.setMoney(guild, user, bal + price)
        this._setOwned(guild, user, stock)
    }

    buy(guild, user, type, am) {
        let bal = bot.moneyman.getMoney(guild, user)
        let s = this.ms[type] || "Alfred"
        let price = this.stocks[s].price * am
        let stock = this._getOwned(guild, user)
        if (price > bal) return "You lack the required funds."
        if (!stock[type]) stock[type] = am
        else stock[type] = stock[type] + am
        bot.moneyman.setMoney(guild, user, bal - price)
        this._setOwned(guild, user, stock)
    }

    createList(guild, user) {
        let owned = this._getOwned(guild, user)
        let text = ["  Company  (Key): Price   - Shift [Owned] ", "=".repeat(40)]
        this._for((name, value) => {
            let company = this._sfill(name, this._litem(Object.keys(this.stocks)))
            let key = value.key
            let price = this._sfill(Nitro.util.formatBal(value.price, true), 7)
            let diff = value.previous ? Nitro.util.formatBal(value.price - value.first, true, true) : 0
            let diffCol = diff > 0 ? "+" : diff < 0 ? "-" : "="
            let own = owned[value.key] || 0
            diff <= 0 || (diff = "+" + diff)
            text.push(`${diffCol} ${company} (${key}): ${price} - ${diff} [${own}]`)
        })
        return text
    }

    _getOwned(guild, user) {
        let users = bot.economy.gKey(guild, "users")
        let id = this._getId(user)
        let u = users[id]
        if (!u) u = {}
        if (!u.stock) u.stock = {}
        return u.stock
    }

    _setOwned(guild, user, stock) {
        let users = bot.economy.gKey(guild, "users")
        let id = this._getId(user)
        let u = users[id]
        if (!u) u = {}
        u.stock = stock
        users[id] = u
        bot.economy.sKey(guild, "users", users)
    }

    _adjustWorth() {
        this._map((name, value) => {
            let am = Nitro.util.round100(Math.random() * 2) + -1
            value.previous = value.price
            value.price = value.price - am > 0 ? value.price - am : 0
            return value
        })
    }

    _genWorth() {
        this._map((name, stock) => {
            stock.price = stock.base
            stock.first = stock.base
            stock.previous = 0
            return stock
        })
    }

    _loop() {
        this._adjustWorth()
        setTimeout(() => this._loop(), 36e5) // 1 hour
    }

    _genMappedStocks() {
        let key = {}
        this._for((k, v) => {
            key[v.key] = k
        })
        return key
    }

    _map(stock) {
        for (let [key, value] of Object.entries(this.stocks)) {
            this.stocks[key] = stock(key, value)
        }
    }

    _for(stock) {
        for (let [key, value] of Object.entries(this.stocks)) {
            stock(key, value)
        }
    }
    // Fill empty space with space to length
    _sfill(text = "", s = 0, prepend = false) {
        let a = s - text.length > 0 ? s - text.length : 0
        return prepend ? " ".repeat(a) + text : text + " ".repeat(a)
    }

    _litem(a = []) {
        let i = 0
        for (let v of a) {
            typeof v !== "string" ||
                v.length < i ||
                (i = v.length)
        }
        return i
    }

    _getId(i) {
        if (!i) return "1234"
        if (i.id) return i.id
        return i
    }
}