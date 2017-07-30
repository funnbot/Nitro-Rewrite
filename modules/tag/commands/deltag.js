module.exports = new Nitro.Command({

  help: "Delete a tag",
  example: "${p}deltag nitro",
  argExample: "<name>",
  dm: false,
  coolDown: 1,
  userPerms: [],
  botPerms: [],

  args: [{
    desc: "What is the name of it?",
    type: "name"
  }],

  run: async (message, bot, send) => {

    let tags = bot.tag.g(message.guild.id)

    let name = message.args[0]
    if (!name) return send("**Invalid tag name**")
    if (!tags[name]) return send("**Tag does not exist**")
    let manage = message.channel.permissionsFor(message.author.id).has("MANAGE_GUILD")
    if (message.author.id !== tags[name].author && !manage) return send("**You do not own this tag**")
    delete tags[name]
    bot.tag.s(message.guild.id, tags)
    send("**Deleted the tag `"+name+"`**")
  }
})
