const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Send a message to an IRC enabled channel.",
    example: "${p}send 277289292093718528 Good morning people I don't know.",
    argExample: "<channelID> <message content>",
    userPerms: 0,
    coolDown: 6,
    botPerms: [],
    alias: [],
    args: [{
            desc: "What is the channel ID?",
            type: "name"
        },
        {
            desc: "What would you like to send?",
            type: "text"
        }
    ],

    run: async(message, bot, send) => {
        let id = message.args[0]
        if (!id) return message.warn("What is the channel ID")
        let content = message.suffixOf(1)
        if (content.length < 1) return message.warn("What is the content?")
        content = content.replace(/^[a-z]/g, "")

        let channels = bot.irc.settings
        if (!channels[id]) return message.fail("Not an IRC channel.")

        let results = await bot.shard.broadcastEval(`
          let client = this
          function s() {
            let channel = client.channels.get("${id}")
            if (!channel) return false
            let embed = new client.Embed()
            embed.setColor("#36393e")
              .setAuthor("${message.author.tag}", "${message.author.avatarURL()}")
              .setDescription("**${message.channel.name} (**${message.channel.id}**):** ${content}")
            channel.send("", {embed})
            return true
          }
          s()`)
        if (results.includes(true)) message.succ("Message Sent.").then(m => m.delete(3000))
        else message.fail("Message Failed.").then(m => m.delete(3000))  
    }
})