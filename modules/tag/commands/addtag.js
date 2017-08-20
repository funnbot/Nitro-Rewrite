const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Create a tag",
    example: "${p}addtag nitro A really cool Discord bot",
    argExample: "<name> <content>",
    dm: false,
    coolDown: 1,
    userPerms: 0,
    botPerms: [],
    alias: ["tagadd", "tag-add"],

    args: [
        {
            prompt: "What would you like to name it?",
            type: "word"
        },
        {
            prompt: "What content should it have?",
            type: "string"
        }
    ],

    run: async(message, bot, send) => {
        let tags = message.guild.get("Tag", "tags")
        let name = message.args[0]
        if (!name) return send("**Invalid tag name**")
        let value = message.args[1]
        if (!value) return send("**Tag content missing**")
        if (tags[name]) return send("**The tag `" + name + "` already exists**")

        tags[name] = {
            content: value,
            author: message.author.id,
            created: Date.now(),
            uses: 0
        }
        message.guild.set("Tag", "tags", tags)
        let a = message.guild.get("Tag")
        return message.channel.send("**That tag `" + name + "` has been created**")
    }
})