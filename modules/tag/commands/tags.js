module.exports = new Nitro.Command({
  help: "List all tags.",
  example: "${p}tags",
  dm: false,
  coolDown: 1,
  alias: ["listtags"],
  userPerms: 0,

  run: async (message, bot, send) => {
    let tags = bot.tag.g(message.guild.id)
    let owned = []
    Object.keys(tags).forEach(t => {
      let tag = tags[t]
      if (tag.author === message.author.id) {
        owned.push(t)
      }
    })
    tags = Object.keys(tags)
    let embed = new bot.embed()
    embed.addField("> Tags on this server", tags.length > 0 ? "**" + tags.join("**, **") + "**" : "**None**")
    embed.addField("> Your Tags", owned.length > 0 ? "**" + owned.join("**, **") + "**": "**None**")
    embed.setColor(embed.randomColor)

    send({embed})
  }
})
