const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("poll");
module.exports = bot

new MessageHandler(bot);