const Client = require("../../struct/Client.js")
const client = new Client("economy")
client.database(["economy"])
module.exports = client.bot
require("./message.js")
client.login()
