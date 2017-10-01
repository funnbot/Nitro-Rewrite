const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Exempt channels from the filter",
    example: "${p}exemptchannel add #advertise || ${p}exemptchannel remove #advertise",
    argExample: "<add/remove> <channel>",
    userPerms: 2,
    coolDown: 2,
    args: [{
        prompt: "`add` or `remove`",
        type: "selection",
        opts: ["add", "remove"]
    }, {
        prompt: "The channel to exempt.",
        type: "channel",
    }],

    run: async(message, bot, send) => {
        if (!message.args[0] || !message.args[1]) return message.fail("Missing option.")

        let conf = message.guild.get("Filter", "exc");
        let a = message.args[0]
        let channel = message.args[1];
        if (!channel.id) return message.fail("Invalid channel.")

        if (a === "add") {
            if (conf[channel.id]) return message.fail("Channel already exempt.");
            
        } else {

        }
    }
})