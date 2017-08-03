module.exports = new Nitro.Command({

  help: "Create a tag",
  example: "${p}addtag nitro A really cool Discord bot",
  argExample: "<name> <content>",
  dm: false,
  coolDown: 1,
  userPerms: 0,
  botPerms: [],
  alias: [],

  args: [
    {
      desc: "What would you like to name it?",
      type: "name"
    },
    {
      desc: "What content should it have?",
      type: "text"
    }
  ],

  run: async (message, bot, send) => {

    let tags = bot.tag.g(message.guild.id)
    let name = Nitro.cleanVarName(message.args[0])
    if (!name) return send("**Invalid tag name**")
    let value = message.suffixOf(1)
    if (!value) return send("**Tag content missing**")
    if (tags[name]) return send("**The tag `" + name + "` already exists**")

    tags[name] = {
      content: value,
      author: message.author.id,
      created: Date.now(),
      uses: 0
    }

    bot.tag.s(message.guild.id, tags)
    return message.channel.send("**That tag `" + name + "` has been created**")
  }

})
