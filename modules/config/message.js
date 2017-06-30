const bot = require('./bot.js')
const CommandHandler = require('../../struct/CommandHandler.js')
const PermissionCheck = require('../../struct/PermissionCheck.js')

const commandhandler = new CommandHandler('dev')
const commands = commandhandler.fetch()

bot.on('message', message => {

    if (message.author.bot) return
    if (message.channel.type !== "text") return
    if (PermissionCheck(message, ["MANAGE_GUILD"])) return 

    commands[message.command] ? commands[message.command].run(message, bot, message.send) : 0

})