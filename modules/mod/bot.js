const Timer = require("./Timer.js");
const CaseManager = require("./CaseManager.js");
const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("mod");
bot.useTable(["Moderation"]);
module.exports = bot

const Message = new MessageHandler(bot);

Message.on("create", m => m.guild ? m.guild.add("caseman", new CaseManager(m.guild)) : 0);

bot.once("ready", () => {
    bot.timer = new Timer(bot);
});

bot.modEmbed = (text) => {
    return new bot.Embed()
        .setDescription(text)
        .setAuthor(bot.user.username, bot.user.avatarURL())
        .setFooter("yes/no")
        .nitroColor()
        .setTimestamp(new Date());
}