const bot = require("./bot.js")
const {
  FUNNBOT
} = require("../../config.js")
const CommandHandler = require("../../struct/CommandLoader.js")

const commandhandler = new CommandHandler("dev")
const commands = commandhandler.fetch()

bot.on("message", async message => {

  if (message.author.id !== FUNNBOT) return
  if (!message.content.startsWith(message.prefix)) return

  commands[message.command] ? await commands[message.command].run(message, bot, message.send) : 0

})
