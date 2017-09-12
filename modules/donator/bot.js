const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("donator");
module.exports = bot;

new MessageHandler(bot);