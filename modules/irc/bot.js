const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("irc");
bot.useTable("IRC");
module.exports = bot;

new MessageHandler(bot);