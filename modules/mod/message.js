const bot = require("./bot.js")

const Message = new Nitro.Message(bot, [
  "commands",
  "alias",
  "permissions",
  "argumenthandler",
  "text",
  "cooldown",
  "execute"
])

Message.on()
