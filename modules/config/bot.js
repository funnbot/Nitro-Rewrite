const Client = require("../../struct/Client.js")
const client = new Client("config")
client.database()
module.exports = client.bot
require("./message.js")
client.login()
