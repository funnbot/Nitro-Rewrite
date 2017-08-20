const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Access a tag",
    example: "${p}tag nitro",
    argExample: "<name>",
    dm: false,
    coolDown: 1,
    userPerms: 0,
    botPerms: [],
    alias: ["t"],

    args: [{
        prompt: "What is the name of it?",
        type: "word"
    }],

    run: async(message, bot, send) => {
        let tags = message.guild.get("Tag", "tags")
        let name = message.args[0]
        if (!name) return send("**Invalid tag name.**")
        if (!tags[name]) return send("**The tag `" + name + "` does not exist.**")
        tags[name].uses++
        message.guild.set("Tag", "tags", tags)
        return send(tags[name].content)
    }
})