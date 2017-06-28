const bot = require('./bot.js')
const { FUNNBOT } = require('../../config.js')
const CommandHandler = require('../../struct/CommandHandler.js')
const Message = require('../../struct/Message.js')

const commandhandler = new CommandHandler('tag')

let commands = commandhandler.fetch()

bot.on('message', message => {

    if (message.author.id !== FUNNBOT) return

    message = Message(message, bot)
    let send = message.channel.send.bind(message.channel)

    commands[message.command] ? commands[message.command].run(message, bot, send) : 0

})