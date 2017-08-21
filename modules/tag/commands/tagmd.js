const Nitro = require("../../../Nitro.js")
const { escapeMarkdown } = require("discord.js")

module.exports = new Nitro.Command({
    help: "Get the markdown source of a tag.",
    example: "${p}tagmd myTag",
    argExample: "<tag>",
    userPerms: 0,
    alias: ["tagsource"],
    args: [{
        prompt: "Which tag?",
        type: "word"
    }],

    run: async(message, bot, send) => {
        let tags = message.guild.get("Tag", "tags")
        let name = message.args[0]
        if (!name) return send("**Invalid tag name.**")
        if (!tags[name]) return send("**The tag `" + name + "` does not exist.**")
        let source = tags[name].content
        return send(source, {code: "md"})
    }
})