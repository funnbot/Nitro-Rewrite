const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("fun");
module.exports = bot;

new MessageHandler(bot);