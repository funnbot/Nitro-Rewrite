const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Set the channel member log messages are sent in.",
    example: "${p}logchannel #welcome",
    argExample: "<channel>",
    userPerms: 2,
    args: [{
        type: "channel",
        prompt: "Which channel?",
    }],

    run: async(message, bot, send) => {
        
    }
})