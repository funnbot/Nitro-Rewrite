const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({

    help: "Delete a tag",
    example: "${p}deltag nitro",
    argExample: "<name>",
    dm: false,
    coolDown: 1,
    userPerms: 0,
    botPerms: ["tagdel", "tag-del"],

    args: [{
        prompt: "What is the name of it?",
        type: "word"
    }],

    run: async(message, bot, send) => {
        let tags = message.guild.get("Tag", "tags")

        let name = message.args[0]
        if (!name) return send("**Invalid tag name**")
        if (!tags[name]) return send("**Tag does not exist**")
        let manage = message.channel.permissionsFor(message.author.id).has("MANAGE_GUILD")
        if (message.author.id !== tags[name].author && !manage) return send("**You do not own this tag**")
        delete tags[name]
        message.guild.set("Tag", "tags", tags)
        send("**Deleted the tag `" + name + "`**")
    }
})