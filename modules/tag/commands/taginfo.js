const Nitro = require("../../../Nitro.js")
const moment = require("moment")

module.exports = new Nitro.Command({
    help: "Info of a tag.",
    example: "${p}taginfo nitro",
    argExample: "<name>",
    dm: false,
    coolDown: 2,
    userPerms: 0,
    botPerms: [],

    alias: ["tinfo"],

    args: [{
        prompt: "What is the name of it?",
        type: "word"
    }],

    run: async(message, bot, send) => {
        let tags = message.guild.get("Tag", "tags")
        let name = message.args[0]
        if (!name) return send("**Invalid tag name**")
        if (!tags[name]) return ("**The tag `" + name + "` does not exist**")
        let tag = tags[name]
        let uses = tag.uses
        let author = tag.author
        let created = tag.created
        created = moment(created).format("MMM Do, YYYY")

        let username
        try {
            let user = await bot.fetchUser(author)
            username = user.username
        } catch (err) {
            username = "Unknown"
        }

        let embed = new bot.Embed()
        embed.setTitle("Tag Info: " + name)
        embed.addField("Created by", username, true)
        embed.addField("on", created, true)
        embed.addField("and used", uses !== 1 ? uses + " times." : uses + " time.", true)
        embed.setColor(embed.randomColor)

        return send({ embed })
    }
})