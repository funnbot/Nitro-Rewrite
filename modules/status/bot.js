const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("status", {
    disableDefaultTables: true
});
this.on("ready", () => require("./statistics.js"))
module.exports = bot