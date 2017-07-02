const Client = require("../../struct/Client.js")
const client = new Client("tag")
client.database(["tag"])
module.exports = client.bot
require("./message.js")
client.login()
