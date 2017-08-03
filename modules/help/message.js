const bot = require("./bot.js")

const Message = new Nitro.Message(bot, [
  "commands",
  "alias",
  "argumenthandler",
  "cooldown",
  "execute",
  "allcommands"
])

Message.on()
