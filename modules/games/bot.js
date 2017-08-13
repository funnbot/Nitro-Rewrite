const Client = require("../../struct/Client.js")
const client = new Client("game")
client.database(["game", "economy"])
module.exports = client.bot
const MoneyManager = require("./MoneyManager.js")
client.bot.moneyman = new MoneyManager()
require("./message.js")
client.login()
