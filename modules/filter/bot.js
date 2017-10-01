const { NitroClient, MessageHandler } = require("../../Nitro.js");
const filterpacks = require("./filterpack.js");
const bot = new NitroClient("filter");
bot.useTable("Filter");
module.exports = bot;



bot.addStrike = async(guild, user) => {
    const users = guild.get("Filter", "users");
    const ban = guild.get("Filter", "ban");
    const kick = guild.get("Filter", "kick");

    let u = users[user.id] || 0;
    u++;
    users[user.id] = u;

    if (ban && u >= ban) {
        try {
            await user.send("**AutoMod:** You have been banned from " + guild.name);
        } catch (e) {
            console.log(e);
        }
        guild.ban(user).catch(console.log);
        delete users[user.id];
    } else if (kick && u >= kick) {
        try {
            await user.send("**AutoMod:** You have been kicked from " + guild.name)
        } catch (e) {
            console.log(e);
        }
        guild.kick(user).catch(console.log);
        users[user.id]++;
    }

    return guild.set("Filter", "users", users);
}

const Message = new MessageHandler(bot);

Message.on("create", message => {
    if (message.channel.type !== "text") return;
    //Handle Filtering.
    const filterRegExp = message.guild.get("Filter", "filterRegExp");
    const fp = message.guild.get("Filter", "filterpacks");
    if (!filterRegExp && !fp) return;
    const ex = message.guild.get("Filter", "exc");
    const content = message.content.toLowerCase();

    if (ex[message.channel.id]) return;
    if (ex[message.author.id]) return;
    for (let id of Object.keys(ex)) {
        if (message.member && message.member.roles.has(ex)) return;
    }
    for (let pack of Object.keys(filterpacks)) {
        if (fp[pack]) {
            if (filterpacks[pack].test(content)) {
                bot.addStrike(message.guild, message.author)
                return message.delete().catch(console.log);
            }
        }
    }
    if (filterRegExp) {
        const reg = new RegExp(filterRegExp);
        if (reg.test(content)) {
            bot.addStrike(message.guild, message.author)
            return message.delete().catch(console.log);
        }
    }
})