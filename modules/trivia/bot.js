const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("trivia");
bot.useTable(["Trivia"], "Economy");
module.exports = bot;
new MessageHandler(bot, {
    moneyManager: true
});