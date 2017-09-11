const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("info");
module.exports = bot;

new MessageHandler(bot, {
    fetchAllCommands: true
});
