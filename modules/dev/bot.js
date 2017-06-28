const Client = require('../../struct/Client.js')
const DatabaseManager = require('../../struct/DatabaseManager.js')

const client = new Client('dev')
const bot = client.bot

const prefix = new DatabaseManager('prefix')

bot.prefix = prefix
module.exports = bot

require('./messageEvent.js')

client.login()