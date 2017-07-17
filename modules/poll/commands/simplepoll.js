module.exports = new Nitro.Command({
  help: "Create a simple poll which uses :thumbsup: and :thumbsdown:",
  example: "${p}simplepoll Is Nitro the best bot?",
  argExample: "<question>",
  dm: false,
  coolDown: 30,
  alias: ["spoll"],
  botPerms: ["ADD_REACTIONS"],
  args: [{
    desc: "What is the content?",
    type: "text"
  }],

  run: async (message, bot, send) => {
    let poll = message.suffix
    if (poll.length < 1) return send("**What is the content of the poll?**")

    send("**Poll:**\n" + poll).then(msg => {
      let lastUp, lastDown
      msg.createReactionCollector((reaction, user) => {
        if (user.bot && user.id !== bot.user.id) return reaction.remove(user), false
        if ((reaction.emoji.name === "👍" || reaction.emoji.name === "👎") && bot.user.id !== user.id) {
          if (reaction.emoji.name === "👍" && (lastUp || reaction.users.size < lastUp.users.size)) {
            user.del("simplepoll")
          } else {
            if (user.check("simplepoll")) reaction.remove(user)
            else user.add("simplepoll")
          }
          if (reaction.emoji.name === "👎" && (lastDown || reaction.users.size < lastDown.users.size)) {
            user.del("simplepoll")
          } else {
            if (user.check("simplepoll")) reaction.remove(user)
            else user.add("simplepoll")
          }
          if (reaction.users.size < lastReact.users.size) {

          } else {
            if (users[user.id]) reaction.remove(user)
            else users[user.id] = true
          }
        }
        reaction.emoji.name === "👍" ? lastUp = reaction : 0
        reaction.emoji.name === "👎" ? lastDown = reaction : 0
        return false
      }, {time: 1800000})

      msg.react("👍").then(() => msg.react("👎"))
    })
  }
})