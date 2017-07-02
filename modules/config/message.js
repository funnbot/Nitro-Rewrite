const bot = require("./bot.js")
const CommandHandler = require("../../struct/CommandLoader.js")
const PermissionCheck = require("../../struct/PermissionCheck.js")

const commandhandler = new CommandHandler("config")
const commands = commandhandler.fetch()

bot.on("message", async message => {

  if (message.author.bot) return
  if (!message.content.startsWith(message.prefix)) return
  if (message.channel.type !== "text") return
  if (PermissionCheck(message, ["MANAGE_GUILD"])) return

  commands[message.command] ? await commands[message.command].run(bot, message, message.send) : 0

})
