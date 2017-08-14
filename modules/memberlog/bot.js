const Client = require("../../struct/Client.js")
const { Message } = require("../../Nitro.js")
const client = new Client("memberlog")
client.database(["memberlog"])
module.exports = client.bot
new Message(client.bot)
require("./guildMemberAdd+Remove")
client.login()