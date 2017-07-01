const Client = require("../../struct/Client.js")
const client = new Client("dev")
client.database(["prefix"])
module.exports = client.bot
require("./message.js")
client.login()
