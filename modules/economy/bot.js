const Client = require("../../struct/Client.js")
const client = new Client("economy")
client.database(["economy"])
module.exports = client.bot
const MoneyManager = require("./MoneyManager.js")
client.bot.moneyman = new MoneyManager()
require("./message.js")
client.login()
