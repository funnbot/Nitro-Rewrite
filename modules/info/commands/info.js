const Nitro = require("../../../Nitro.js")
const { util } = Nitro;
const Discord = require("discord.js");
const os = require("os");
const moment = require("moment");

module.exports = new Nitro.Command({
    help: "General info for Nitro",
    example: "${p}info",
    alias: ["stats"],

    run: async(message, bot, send) => {
        const s = await fetchStuff(bot);
        if (!s) return send("**Something went wrong fetching stats.**");

        const stats = "**```prolog\n" + [
            `Shard     :: #${s.SHARDID}`,
            `Guilds    :: ${s.GUILDS}`,
            `Channels  :: ${s.CHANNELS}`,
            `Users     :: ${s.USERS}`,
            "",
            `Shards    :: ${s.SHARDCOUNT}`,
            `Guilds    :: ${s.TOTAL_GUILDS}`,
            `Channels  :: ${s.TOTAL_CHANNELS}`,
            `Users     :: ${s.TOTAL_USERS}`
        ].join("\n") + "```**";

        const envir = "**```prolog\n" + [
            `NodeJS    :: ${s.NODE_V}`,
            `OS        :: ${s.OS}`,
            `Library   :: ${s.LIBRARY}`,
            `Version   :: ${s.LIBRARY_V}`,
            "",
            `Memory    :: ${s.MEMORY}`,
            `CPU       :: ${s.CPU}`,
            `Ping      :: ${s.PING}`,
            `Uptime    :: ${s.UPTIME}`
        ].join("\n") + "```**";

        const info = "**```prolog\n" + [
            `Creator   :: ${s.CREATOR}`,
            `Modules   :: ${s.MODULES}`,
            `Commands  :: ${s.COMMANDS}`,
            "Website   :: nitro.ws",
            "Patreon   :: patreon.com/nitrobot",
            "PayPal    :: paypal.me/funnbot"
        ].join("\n") + "```**";
        
        const embed = new bot.Embed()
            .addField("—— Statistics ——", stats, true)
            .addField("—— Environment ——", envir, true)
            .addField("—— Information ——", info, true)
            .nitroColor()
        if (message.channel.permissionsFor(bot.user).has("EMBED_LINKS"))
            return send({ embed });
        else return send(embed.asMessage());
    }
})

async function fetchStuff(bot) {
    let s = {};

    s.GUILDS = bot.guilds.size;
    s.CHANNELS = bot.channels.size;
    s.USERS = bot.users.size;
    s.SHARDID = bot.shard.id + 1;
    s.SHARDCOUNT = bot.shard.count;
    s.NODE_V = process.version;
    s.LIBRARY_V = Discord.version;
    s.LIBRARY = "discord.js";
    s.CREATOR = "Funnbot#8830";
    s.OS = process.platform;
    s.PING = util.round100(bot.ping) + "MS";

    try {
        s.TOTAL_GUILDS = await bot.shard.clientValuesReduced("guilds.size");
        s.TOTAL_CHANNELS = await bot.shard.clientValuesReduced("channels.size");
        s.TOTAL_USERS = await bot.shard.clientValuesReduced("users.size");
    } catch (e) {
        console.log(e);
        return null;
    }

    const cpu = os.loadavg();
    s.CPU = Math.ceil(cpu[1] * 100) / 10 + "%";
    const mem = process.memoryUsage().rss / 1024 / 1024;
    s.MEMORY = Math.round(mem) + "MB";
    const ut = moment.duration(bot.uptime);
    s.UPTIME = ut.humanize();
    const all = bot.allCommands;
    s.MODULES = Object.keys(all).length;
    let cmds = [];
    Object.values(all).map(c => cmds.push(...Object.keys(c)))
    s.COMMANDS = cmds.length;

    return s;
}