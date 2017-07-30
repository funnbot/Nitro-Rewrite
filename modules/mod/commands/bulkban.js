module.exports = new Nitro.Command({
  help: "Ban multiple users.",
  example: "${p}bulkban @Funnbot @Nitro @Potato @Scammer403 | Nigerian princes selling their fortune.",
  argExample: "<user> <user> ... | <reason> ",
  dm: false,
  coolDown: 1,
  userPerms: ["BAN_MEMBERS"],
  botPerms: ["BAN_MEMBERS"],

  args: [],

  run: async (message, bot, send) => {
    if (!message.checkSuffix) return send(module.exports.example.replace("${p}", message.prefix))
    let splitDel = message.suffix.split("|")
    let reason = splitDel[1] || false
    let users = splitDel[0]
    users = users.split(" ")
    let members = []
    for (let u of users) {
      let member = await message.parseUser(u)
      if (member && member.bannable) members.push(member)
    }
    if (members.length < 0) return send("**Invalid Users:** " + splitDel[0])
    if (members.length < 1) return send("**Bulk ban requires 2 or more users**")
    let list = members.map(m => m.user.tag).join(", ")
    let embed = new bot.embed()
    embed.setDescription(`**Are you sure you want to ban the users: ${list}**`)
    embed.setAuthor(bot.user.username, bot.user.avatarURL())
    embed.setFooter("yes/no")
    embed.setColor(embed.randomColor)
    embed.setTimestamp(new Date())
    send("", {embed}).then(async msg => {
      let failsafe = await message.collectMessage(["yes", "y", "yup"], ["no", "n", "nope"], "author")
      if (!failsafe) return send("**Ban Cancelled**")
      msg.edit("**Banning users...**", {embed: null})
      let options = reason ? {reason, days: 7} : {days: 7}
      for (let m of members) {
        try {
          //await m.ban(options)
          let caseman = message.guild.check("caseman")
          if (!caseman) throw new Error("CaseManager was not initialized.")
          caseman.newCase(message.author, m.user, "ban", {reason: reason})
        } catch (err) {
          console.log(err)
          return send("**I was unable to ban the user:** " + m.user.tag)
        }
      }
      msg.edit("**Ban complete**")
    })
  }
})
