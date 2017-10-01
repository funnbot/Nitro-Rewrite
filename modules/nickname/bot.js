const { NitroClient, MessageHandler } = require("../../Nitro.js");
const { GuildMember } = require("discord.js");
let { curses } = require("../filter/filterpack.js");
curses = new RegExp(curses, "gi");

const bot = new NitroClient("nickname");
bot.useTable("Nickname");
module.exports = bot;

new MessageHandler(bot);

bot.on("guildMemberUpdate", (oldMember, member) => {
    if (member instanceof GuildMember == false) return;
    if (oldMember instanceof GuildMember == false) return;
    if (oldMember.nickname === member.nickname) return;
    if (!member.guild) return;

    const { guild } = member;
    const botMember = guild.member(bot.user);
    if (!botMember || !botMember.hasPermission("MANAGE_NICKNAMES")) return;

    const boost = guild.get("Nickname", "boost");
    const mention = guild.get("Nickname", "mention");
    const curse = guild.get("Nickname", "curse");

    let nick = member.displayName;
    let newNick = null;

    function replace(regex) {
        newNick = nick.replace(regex, "$1");
        if (newNick.length === 0) {
            nick = member.user.username;
            newNick = nick.replace(regex, "$1");
            if (newNick.length === 0) newNick = "Restricted Nickname";
        }
    }

    if (boost) replace(/^[\!-\.\s]+(.*)$/);
    if (mention) replace(/^[^\s!-~]+(.*)$/);
    if (curse) replace(curses);

    if (newNick) member.setNickname(newNick).catch(e => e);
});

bot.on("guildMemberAdd", member => {
    if (member instanceof GuildMember == false) return;
    const { guild } = member;
    const botMember = guild.member(bot.user);
    if (!botMember || !botMember.hasPermission("MANAGE_NICKNAMES")) return;

    const boost = guild.get("Nickname", "boost");
    const mention = guild.get("Nickname", "mention");
    const curse = guild.get("Nickname", "curse");
    const auto = guild.get("Nickname", "auto");

    let nick = member.user.username;
    let newNick = null;

    function replace(regex) {
        nick = member.user.username;
        newNick = nick.replace(regex, "$1");
        if (newNick.length === 0) newNick = "Restricted Nickname";
    }

    if (boost) replace(/^[\!-\.\s]+(.*)$/);
    if (mention) replace(/^[^\s!-~]+(.*)$/);
    if (curse) replace(curses);

    if (auto) {
        newNick = auto.replace("{name}", nick);
    }

    if (newNick) member.setNickname(newNick);
})