const { NitroClient, MessageHandler } = require("../../Nitro.js");
const filterpacks = require("./filterpack.js");
const bot = new NitroClient("filter");
bot.useTable("Filter");
module.exports = bot;

bot.addStrikes = async (guild, user) => {
    const users = guild.get("Filter", "users");
    const ban = guild.get("Filter", "ban");
    const kick = guild.get("Filter", "kick");

    let u = users[user.id] || 0;
    u++;

    if (u >= ban) {
        try {
            await user.send("**AutoMod:** You have been banned from " + guild.name);
        } catch(e) {
            console.log(e);
        }
        guild.ban(user).catch(console.log);
        users[user.id] = 0;
        return guild.set("Filter", "users", users);
    }

    if (u >= kick) {
        try {
            await user.send("**AutoMod:** You have been kicked from " + guild.name)
        } catch(e) {
            console.log(e);
        }
        guild.kick(user).catch(console.log);
        

    }
}

const Message = new MessageHandler(bot);

Message.on("create", message => {
    if (message.channel.type !== "text") return;
    //Handle Filtering.
    const filters = message.guild.get("Filter", "filters");
    const fp = message.guild.get("Filter", "filterpacks");
    if (!filters && !fp) return;
    const ex = message.guild.get("Filter", "exc");
    const channel = message.guild.get("Filter", "channel")
    const content = message.content.toLowerCase();

    if (ex[message.channel.id]) return;
    if (ex[message.author.id]) return;
    for (let id of Object.keys(ex)) {
        if (message.member && message.member.roles.has(ex)) return;
    }
    for (let pack of Object.keys(filterpacks)) {
        if (fp[pack]) {
            if (fp[pack].test(content)) {
                addStrike(message)
                return message.delete().catch(console.log);
            }
        }
    }
    if (filters) {
        if (filters.test(content)) {
            addStrike(message)
            return message.delete().catch(console.log);
        }
    }
})

function addStrike({ author, guild }) {
    const useStrikes = guild.get("Filter", "strikes");
    if (!useStrikes) return;

    const users = guild.get("Filter", "users");
    if (!users[author.id]) users[author.id] = 1;
    else users[author.id]++;
    guild.set("Filter", "users", users);

    const msg = "**You have been given a strike for using a restricted word.**"; //hmmmmmm
}