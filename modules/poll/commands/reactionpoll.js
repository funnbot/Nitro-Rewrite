const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
  help: "Create a poll with multiple options using reactions.",
  example: "${p}reactionpoll Which is the best bot? | Mee8 | Clyde | B1nzy",
  argExample: "<question> | <option1> | <option2> | ...",
  dm: false,
  coolDown: 10,
  botPerms: ["ADD_REACTIONS", "MANAGE_MESSAGES"],
  userPerms: 0,
  alias: ["rpoll"],
  args: [
    {
      desc: "What are the options?\nSeparate with the character: `|`\nEx. `What is the best bot? | Nitro | Mee6 | Funnbot`",
      type: "text"
    }
  ],

  run: async (message, bot, send) => {
    let numbers = [ "0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣" ]

    if (!message.checkSuffix) return send("**Provide the poll question and options.**")
    let split = message.suffix.split("|")
    let quest = split[0].trim()
    split = split.slice(1).map(t => t.trim())
    if (!split[0]) return send("**You must split your question and options with `|`**")
    if (split.length < 3) return send("**You must have one or more option to make a poll**")
    if (split.length > 11) return send("**No more than 10 options allowed.**")
    let options = []
    split.forEach((s, i) => {
      options.push(numbers[i] + " **" + s + "**")
    })
    let check = message.channel.check("rpoll")
    message.author.purge("rpoll")
    if (check) check.stop("Another Started")
    let removing
    send("**__" + quest + "__**\n\n" + options.join("\n")).then(async msg => {
      for (let i in split) {
        await msg.react(numbers[i])
      }

      let collector = msg.createReactionCollector((reaction, user, added) => {
        if (reaction.users.size === 0) collector.stop("Deleted Original")
        if (bot.user.id === user.id) return false
        if (removing) {
          removing = false
          return false
        }
        if (added) {
          if (user.check("rpoll")) {
            removing = true
            reaction.remove(user)
            return false
          } else {
            user.add("rpoll")
          }
        } else {
          user.del("rpoll")
        }
      }, {time: 1800000, uncollect: true})
      message.channel.add("rpoll", collector)
    })
  }
})
