const Client = require("../../struct/Client.js")
const client = new Client("irc")
client.database(["irc"])
module.exports = client.bot
require("./message.js")
client.login()