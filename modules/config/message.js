const bot = require("./bot.js")

const cooldown = new Nitro.CoolDown()
const commandhandler = new Nitro.CommandHandler("config")
const commands = commandhandler.fetch()
const perms = new Nitro.PermissionHandler()

bot.on("message", async message => {

  if (message.author.bot) return
  if (!message.content.startsWith(message.prefix)) return
  if (message.channel.type !== "text") return
  if (perms.user(message, bot, ["MANAGE_GUILD"])) return

  let command = commands[message.command]
  if (!command) return

  if (cooldown.run(message, command)) return

  await commands[message.command].run(bot, message, message.send)

})
