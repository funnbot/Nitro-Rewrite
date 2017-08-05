const Client = require("../../struct/Client.js")
const client = new Client("mod")
client.database(["mod"])
module.exports = client.bot
require("./message.js")
client.login()

const Timer = require("./Timer.js")
client.bot.once("ready", () => {
  client.bot.timer = new Timer(client.bot)
})
