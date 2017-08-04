module.exports = new Nitro.Command({
  help: "Ban and unban a user to delete their messages.",
  example: "${p}softban @Funnbot spamming in every channel",
  argExample: "<user> | <reason>",
  dm: false,
  coolDown: 1,
  userPerms: 1,
  botPerms: ["BAN_MEMBERS"],

  args: [],

  run: async (message, bot, send) => {
    if (!message.checkSuffix) return send("**Example: " + module.exports.example.replace("${p}", message.prefix) + "**")
    let user = message.args[0]
    let reason = message.suffixOf(1).length > 0 ? message.suffixOf(1) : false
    let member = await message.parseMember(user)
    if (!member) return send("**Could not find the user: **" + user)
    if (!member.bannable) return send("**I am unable to softban the user:** " + member.user.tag)
    let embed = new bot.embed()
    embed.setDescription(`**Are you sure you want to softban the user: ${member.user.tag}**`)
    embed.setAuthor(bot.user.username, bot.user.avatarURL())
    embed.setFooter("yes/no")
    embed.setColor(embed.randomColor)
    embed.setTimestamp(new Date())
    send("", {embed}).then(async msg => {
      let failsafe = await message.collectMessage(["yes", "y", "yup"], ["no", "n", "nope"], "author")
      if (!failsafe) return send("**Softban Cancelled**")
      await msg.edit("**Softbanning users...**", {embed: null})
      let options = reason ? {reason, days: 1} : {days: 1}
      try {
        await member.send(`**You have been softbanned from ${message.guild.name}**\n\n**Reason:** ${reason || "None"}`)
      } catch (err) {
        console.log(err)
      }
      try {
        await member.ban(options)
        let caseman = message.guild.check("caseman")
        if (!caseman) throw new Error("CaseManager was not initialized.")
        caseman.newCase(message.author, member.user, "softban", {reason: reason})
        await msg.edit("**Awaiting unban**")
      } catch (err) {
        console.log(err)
        send("**I was unable to softban the user:** " + member.user.tag)
      }
      try {
        await message.guild.unban(member.user.id, "Softban")
        msg.edit("**Softban complete**")
      } catch (err) {
        console.log(err)
        send("**I was unable to unban the user:** " + member.user.username)
      }
    })
  }
})
