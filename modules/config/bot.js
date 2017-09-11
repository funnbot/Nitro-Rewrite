const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("config");
bot.useTable("Prefix", "UserPerm");
module.exports = bot;

new MessageHandler(bot);
