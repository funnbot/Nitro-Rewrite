const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("games");
bot.useTable("Economy", "Game");
module.exports = bot;

new MessageHandler(bot, {
    moneyManager: true
})
