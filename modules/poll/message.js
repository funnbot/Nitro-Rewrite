const bot = require("./bot.js")

const commandhandler = new Nitro.CommandHandler("tag")
const commands = commandhandler.fetch()
const alias = new Nitro.Alias("tag", commands)
const cooldown = new Nitro.CoolDown()
const ArgumentHandler = new Nitro.ArgumentHandler()

bot.on("message", async message => {

  if (message.author.bot) return
  if (!message.content.startsWith(message.prefix)) return

  alias.mapCustom(bot.alias.get(message.guild ? message.guild.id : "1234"))
  message.content = alias.run(message)

  let command = commands[message.command]
  if (!command) return

  if (cooldown.run(message, command)) return
  if (!message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return message.author.send("**I lack permission to send messages in this channel**").catch()
  await commands[message.command].run(message, bot, message.send, ArgumentHandler)

})