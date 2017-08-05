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
    desc: "What is the name of it?",
    type: "name"
  }],

  run: async (message, bot, send) => {
    let tags = bot.tag.g(message.guild.id)
    let name = message.args[0]
    name = Nitro.cleanVarName(name)
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

    let embed = new bot.embed()
    embed.setTitle("Tag Info: " + name)
    embed.addField("Created by", username, true)
    embed.addField("on", created, true)
    embed.addField("and used", uses !== 1 ? uses + " times." : uses + " time.", true)
    embed.setColor(embed.randomColor)

    send({embed})
  }
})
