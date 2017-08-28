const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("image");
module.exports = bot

new MessageHandler(bot);