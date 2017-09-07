const { NitroClient } = require("../../Nitro.js");
const bot = new NitroClient("guildjoin");
module.exports = bot;

require("./guildCreate+Delete.js");