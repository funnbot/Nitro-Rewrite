const bot = require("./bot.js")
const CommandHandler = require("../../struct/CommandLoader.js")

const commandhandler = new CommandHandler("tag")
const commands = commandhandler.fetch()

bot.on("message", async message => {

  if (!message.content.startsWith(message.prefix)) return

  commands[message.command] ? await commands[message.command].run(message, bot, message.send) : 0

})
