const Timer = require("./Timer.js")
const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("tag");
bot.useTable("Moderation");
module.exports = bot

new MessageHandler(bot);

bot.once("ready", () => {
  bot.timer = new Timer(bot)
})
