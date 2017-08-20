const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("tag");
bot.useTable("Tag");
module.exports = bot

new MessageHandler(bot);