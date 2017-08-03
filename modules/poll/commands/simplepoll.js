module.exports = new Nitro.Command({
  help: "Create a simple poll which uses :thumbsup: and :thumbsdown:",
  example: "${p}simplepoll Is Nitro the best bot?",
  argExample: "<question>",
  dm: false,
  coolDown: 10,
  alias: ["spoll"],
  botPerms: ["ADD_REACTIONS", "MANAGE_MESSAGES"],
  userPerms: 0,
  args: [{
    desc: "What is the content?",
    type: "text"
  }],

  run: async (message, bot, send) => {
    let poll = message.suffix
    if (poll.length < 1) return send("**What is the content of the poll?**")
    let check = message.channel.check("spoll")
    message.author.purge("spoll")
    if (check) check.stop("Another Started")
    let lastUp, lastDown, removing
    send("**__" + poll + "__**").then(msg => {
      let collector = msg.createReactionCollector((reaction, user) => {
        if (reaction.users.size === 0) collector.stop("Deleted Original")
        if (bot.user.id === user.id) return false
        if (removing) {
          removing = false
          return false
        }
        let isUp = reaction.emoji.name === "👍"
        let isDown = reaction.emoji.name === "👎"
        if (isUp) {
          //up vote
          if (!lastUp || lastUp < reaction.users.size) {
            //add
            if (user.check("spoll")) {
              //Already voted
              reaction.remove(user)
              removing = true
              return false
            } else {
              //had not voted
              user.add("spoll")
            }
          } else {
            //remove
            user.del("spoll")
          }
          lastUp = reaction.users.size
        } else if (isDown) {
          //down vote
          if (!lastDown || lastDown < reaction.users.size) {
            //add
            if (user.check("spoll")) {
              //Already voted
              reaction.remove(user)
              removing = true
              return false
            } else {
              //had not voted
              user.add("spoll")
            }
          } else {
            //remove
            user.del("spoll")
          }
          lastDown = reaction.users.size
        }
        return false
      }, {time: 1800000, uncollect: true})
      message.channel.add("spoll", collector)
      msg.react("👍").then(() => msg.react("👎"))
    })
  }
})