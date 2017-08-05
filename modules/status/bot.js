const Client = require("../../struct/Client.js")
const client = new Client("status")
client.database()
module.exports = client.bot
client.ready(() => require("./statistics.js"))
client.login()
