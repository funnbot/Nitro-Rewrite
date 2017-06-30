const bot = require('./bot.js')
const { FUNNBOT } = require('../../config.js')
const CommandHandler = require('../../struct/CommandHandler.js')

const commandhandler = new CommandHandler('dev')
const commands = commandhandler.fetch()

bot.on('message', message => {

    if (message.author.id !== FUNNBOT) return

    commands[message.command] ? commands[message.command].run(message, bot, message.send) : 0

})