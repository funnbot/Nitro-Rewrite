const Client = require("../../struct/Client.js")
const Nitro = require("../../Nitro.js")
const client = new Client("trivia")
client.database(["trivia", "economy"])
module.exports = client.bot
const MoneyManager = require("./MoneyManager.js")
client.bot.moneyman = new MoneyManager()
new Nitro.Message(client.bot)
client.login()