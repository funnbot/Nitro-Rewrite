module.exports = new Nitro.Command({
  help: "Ban a user.",
  example: "${p}ban Funnbot Spamming chat with memes.",
  argExample: "<user> <reason>",
  dm: false,
  coolDown: 1,
  userPerms: 1,
  botPerms: ["BAN_MEMBERS"],

  args: [],

  run: async (message, bot, send) => {
    if (!message.checkSuffix) return send("**Example: " + module.exports.example.replace("${p}", message.prefix) + "**")
    let user = message.args[0]
    let reason = message.suffixOf(1).length > 0 ? message.suffixOf(1) : false
    let member = await message.parseUser(user)
    if (!member) return send("**Could not find the user: **" + user)
    if (!member.bannable) return send("**I am unable to ban the user:** " + member.user.tag)
    let embed = new bot.embed()
    embed.setDescription(`**Are you sure you want to ban the user: ${member.user.tag}**`)
    embed.setAuthor(bot.user.username, bot.user.avatarURL())
    embed.setFooter("yes/no")
    embed.setColor(embed.randomColor)
    embed.setTimestamp(new Date())
    send("", {embed}).then(async msg => {
      let failsafe = await message.collectMessage(["yes", "y", "yup"], ["no", "n", "nope"], "author")
      if (!failsafe) return send("**Ban Cancelled**")
      await msg.edit("**Banning user...**", {embed: null})
      let options = reason ? {reason, days: 1} : {days: 1}
      try {
        await member.send(`**You have been banned from ${message.guild.name}**\n\n**Reason:** ${reason || "None"}`)
      } catch (err) {
        console.log(err)
      }
      try {
        await member.ban(options)
        let caseman = message.guild.check("caseman")
        if (!caseman) throw new Error("CaseManager was not initialized.")
        caseman.newCase(message.author, member.user, "ban", {reason: reason})
      } catch (err) {
        console.log(err)
        send("**I was unable to ban the user:** " + member.user.tag)
      }
      msg.edit("**Ban complete**")
    })
  }
})
