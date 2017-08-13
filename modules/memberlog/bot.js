const Client = require("../../struct/Client.js")
const Nitro = require("../../Nitro.js")
const client = new Client("help")
client.database(["memberlog"])
module.exports = client.bot
new Nitro.Message(client.bot)
require("./guildMemberAdd+Remove")
client.login()