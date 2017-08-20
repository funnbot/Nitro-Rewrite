const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Set the channel member log messages are sent in.",
    example: "${p}logchannel #welcome",
    argExample: "<channel>",
    userPerms: 2,
    args: [{
        type: "channel",
        prompt: "Which channel?",
        optional: true
    }],

    run: async(message, bot, send) => {
        let channel = message.args[0] || false
        let c = message.guild.get("memberlog", {})

        if (!channel) {
            c.channel || delete c.channel
            bot.memberlog.s(message.guild, c)
            return message.succ("Disabled member log.")
        }

        if (channel.type !== "text") return message.fail("Invalid channel type:", "voice")

        c.channel = channel.id
        bot.memberlog.s(message.guild, c)
        return message.succ("Set member log to:", channel)
    }
})