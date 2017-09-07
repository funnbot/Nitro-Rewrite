const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Set the case log channel.",
    example: "${p}setlogs mod-log",
    argExample: "<channel>",
    dm: false,
    coolDown: 5,
    userPerms: 2,
    botPerms: [],

    args: [{
        prompt: "Which channel?",
        type: "channel",
        optional: true
    }],

    run: async(message, bot, send) => {
        let channel = message.args[0] || message.channel
        if (!channel || channel.type !== "text") return send("**Invalid Channel**")
        message.guild.set("Moderation", "channel", channel.id);
        send("**Moderator logs set to:** " + channel)
    }
})