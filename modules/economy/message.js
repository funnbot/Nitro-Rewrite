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

Message.on(message => {
  /*
  TODO: Users will earn money based on messages sent,
  TODO: random amount between 0.00 and 3.00 at .50 increments,
  TODO: Also a 3+- second cooldown to prevent spam exploits.
  /*
  TODO: Find out how to make
  multi-line to do.
  */
})
