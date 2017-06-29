const bot = require('./bot.js')
const { FUNNBOT } = require('../../config.js')
const CommandHandler = require('../../struct/CommandHandler.js')

const commandhandler = new CommandHandler('dev')

let commands = commandhandler.fetch()

bot.on('message', message => {

    if (message.author.id !== FUNNBOT) return

    //message = new Message(message, bot)

    commands[message.command] ? commands[message.command].run(message, bot, message.send) : 0

})