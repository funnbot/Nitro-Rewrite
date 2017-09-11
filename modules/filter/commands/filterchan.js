const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Set the channel filter automod messages are sent in ie: user kicked for spamming a forbidden word",
    example: "${p}filterchan #moderator_logs",
    argExample: "<channel>",
    userPerms: 2,
    args: [{
        prompt: "Which channel will filter automod messages be sent in? `disable` to disable.",
        type: "channel"
    }],

    run: async(message, bot, send) => {
        let channel = message.args[0];
        let conf = message.guild.get("Filter", "channel");
        if (channel === "disable") {
            if (!conf) {
                return send("**Set the channel filter automod messages are sent in.**");
            }
            message.guild.set("Filter", "channel", null);
            return message.succ("Filter automod channel disabled.");
        }
        let p = channel.permissionsFor(bot.user);
        if (!p.has("SEND_MESSAGES") || !p.has("EMBED_LINKS")) return send("**I cannot send embeds in this channel**");
        conf = channel.id;
        message.guild.set("Filter", "channel", conf);
        return message.succ("Filter automod messages will now be sent in:", channel.name)
    }
})