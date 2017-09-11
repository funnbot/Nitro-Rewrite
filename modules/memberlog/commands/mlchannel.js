const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Set the channel member log messages are sent in.",
    example: "${p}mlchannel #welcome",
    argExample: "<channel>",
    userPerms: 2,
    args: [{
        type: "channel",
        prompt: "Which channel will member log messages be sent in?",
        optional: true
    }],

    alias: ["mlchan"],

    run: async(message, bot, send) => {
        let channel = message.args[0] || false;
        let config = message.guild.get("MemberLog", "channel");

        if (!channel) {
            if (!config) {
                return send("**Set the channel member log messages are sent in.**");
            }
            message.guild.set("MemberLog", "channel", null);
            return message.succ("Disabled member log.");
        }

        if (channel.type !== "text") return message.fail("Invalid channel type:", "voice");
        if (!channel.permissionsFor(bot.user).has("SEND_MESSAGES")) return message.fail("I can not send messages in this channel.");

        config = channel.id
        message.guild.set("MemberLog", "channel", config)
        return message.succ("Set member log to:", channel + "\n\nYou can disable member log by not providing an argument.")
    }
})