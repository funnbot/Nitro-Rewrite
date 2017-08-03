module.exports = new Nitro.Command({
  help: "Kick a user",
  example: "${p}kick @Funnbot Needs to learn a lesson.",
  argExample: "<user> <reason>",
  dm: false,
  coolDown: 1,
  userPerms: 1,
  botPerms: ["KICK_MEMBERS"],

  args: [],

  run: async (message, bot, send) => {
    if (!message.checkSuffix) return send("**Example: " + module.exports.example.replace("${p}", message.prefix) + "**")
    let user = message.args[0]
    let reason = message.suffixOf(1).length > 0 ? message.suffixOf(1) : false
    let member = await message.parseUser(user)
    if (!member) return send("**Could not find the user: **" + user)
    if (!member.kickable) return send("**I am unable to kick the user:** " + member.user.tag)
    send("**Kicking user...**").then(async msg => {
      try {
        await member.send(`**You have been kicked from ${message.guild.name}**\n\n**Reason:** ${reason || "None"}`)
      } catch (err) {
        console.log(err)
      }
      try {
        await member.kick(reason)
        let caseman = message.guild.check("caseman")
        if (!caseman) throw new Error("CaseManager was not initialized.")
        caseman.newCase(message.author, member.user, "kick", {reason: reason})
        msg.edit("**Kick complete**")
      } catch (err) {
        console.log(err)
        send("**I was unable to kick the user:** " + member.user.tag)
      }
    })
  }
})