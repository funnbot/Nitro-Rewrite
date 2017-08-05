const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
  help: "Set the case log channel.",
  example: "${p}setlogs mod-log",
  argExample: "<channel>",
  dm: false,
  coolDown: 5,
  userPerms: 2,
  botPerms: [],

  args: [{
    desc: "Which channel?",
    type: "channel"
  }],

  run: async (message, bot, send) => {
    if (!message.checkSuffix) return send("**Which channel?**")
    let channel = message.suffix
    channel = Nitro.cleanVarName(channel)
    channel = await message.parseChannel(channel)
    if (!channel) return send("**Invalid Channel**")
    let modDB = bot.mod.g(message.guild.id)
    modDB.channel = channel.id
    bot.mod.s(message.guild.id, modDB)
    send("**Moderator logs set to:** " + channel)
  }
})
