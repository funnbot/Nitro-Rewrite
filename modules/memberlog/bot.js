const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("memberlog");
bot.useTable("MemberLog");
module.exports = bot;

new MessageHandler(bot);

require("./guildMemberAdd+Remove.js");