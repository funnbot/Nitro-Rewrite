const { MessageHandler, NitroClient, config } = require("../../Nitro.js");
const bot = new NitroClient("dev", {
    disableDefaultTables: true
})
module.exports = bot
bot.useTable(...Object.keys(config.TABLES))

require("./message.js")