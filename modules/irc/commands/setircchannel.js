const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Toggle the current channel to allow IRC messages.",
    example: "${p}setircchannel",
    argExample: "",
    userPerms: 2,

    run: async(message, bot, send) => {
        let channel = bot.table("IRC").get(message.channel.id);
        if (channel && channel.state === "on") {
            channel.state = "off"
            bot.table("IRC").set(message.channel.id, channel);
            bot.irc.s(message.channel.id, channel)
        } else {
            channel.state = "on"
            bot.table("IRC").set(message.channel.id, channel);
            message.succ("Enabled IRC messages in this channel.")
        }
    }
})