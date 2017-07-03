const bot = require("./bot.js")

const commandhandler = new Nitro.CommandHandler("tag")
const commands = commandhandler.fetch()
const cooldown = new Nitro.CoolDown()

bot.on("message", async message => {

  if (message.author.bot) return
  if (!message.content.startsWith(message.prefix)) return

  let command = commands[message.command]
  if (!command) return

  if (cooldown.run(message, command)) return

  commands[message.command] ? await commands[message.command].run(message, bot, message.send) : 0

})
