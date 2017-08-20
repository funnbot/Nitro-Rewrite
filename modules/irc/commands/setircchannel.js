const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Toggle the current channel to allow IRC messages.",
    example: "${p}setircchannel",
    argExample: "",
    userPerms: 2,
    botPerms: [],
    alias: [],
    args: [],

    run: async(message, bot, send) => {
        let channel = message.guild.get("irc", {})
        if (channel && channel.state === "on") {
            channel.state = "off"
            bot.irc.s(message.channel.id, channel)
            message.succ("Disabed IRC messages in this channel.")
        } else {
            channel.state = "on"
            bot.irc.s(message.channel.id, channel)
            message.succ("Enabled IRC messages in this channel.")
        }
    }
})