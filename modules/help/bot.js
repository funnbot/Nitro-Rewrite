const { MessageHandler, NitroClient } = require("../../Nitro.js");
const bot = new NitroClient("help");
module.exports = bot

new MessageHandler(bot, {
    fetchAllCommands: true
})