module.exports = new Nitro.Command({
  help: "Access a tag",
  example: "${p}tag nitro",
  argExample: "<name>",
  dm: false,
  coolDown: 1,
  userPerms: [],
  botPerms: [],
  alias: ["t"],

  args: [{
    desc: "What is the name of it?",
    type: "name"
  }],

  run: async (message, bot, send) => {
    let tags = bot.tag.g(message.guild.id)
    let name = message.args[0]
    name = Nitro.cleanVarName(name)
    if (!name) return send("**Invalid tag name.**")
    if (!tags[name]) return send("**The tag `"+name+"` does not exist.**")
    tags[name].uses++
    bot.tag.s(message.guild.id, tags)
    return send(tags[name].content)
  }
})
