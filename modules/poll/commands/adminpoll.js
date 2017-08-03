const Duration = require("duration-js")

module.exports = new Nitro.Command({
  help: "A more customizable poll.",
  example: "${p}adminpoll #announcements #voting 10m30s",
  argExample: "<the channel the poll is sent to> <the channel people vote from> <time> <question> | <optionOne> | <optionTwo> | ...",
  dm: false,
  coolDown: 60,
  alias: ["apoll"],
  userPerms: 3,
  args: [
    {
      desc: "What channel should it be displayed in?",
      type: "channel"
    },
    {
      desc: "What channel should users vote from?",
      type: "channel"
    },
    {
      desc: "How long will it run?",
      type: "name"
    },
    {
      desc: "What are the options?\nSeparate with the character: `|`\nEx. `What is the best bot? | Nitro | Mee6 | Funnbot`",
      type: "text"
    }
  ],

  run: async (message, bot, send) => {
    if (message.guild.check("apoll")) return send("**There is already a poll running.**")
    let display = message.args[0]
    if (!display) return send("**What channel will the poll be displayed in?**")
    display = message.guild.channels.get(display)
    if (!display || display.type !== "text") return send("**Invalid display channel.**")
    if (!display.permissionsFor(bot.user).has("SEND_MESSAGES")) return send("**I lack permission to send messages in the channel <#" + display.id + ">.**")
    let voting = message.args[1]
    if (!voting) return send("**What channel will people vote in?**")
    voting = message.guild.channels.get(voting)
    if (!voting || voting.type !== "text") return send("**Invalid voting channel.**")
    if (!voting.permissionsFor(bot.user).has("SEND_MESSAGES")) return send("**I lack permission to send messages in the channel <#" + voting.id + ">.**")
    let time = message.args[2]
    if (!time) return send("**How long will it run?**\nEx. 10m30s - 10 minutes and 30 seconds, 180m - 3 hours")
    try {
      time = new Duration(time)
    } catch (err) {
      return send("**The time was not formatted correctly**")
    }
    if (time.hours() > 10) return send("**Admin polls can not be longer than 10 hours.**")
    if (time.minutes() < 5) return send("**Admin polls must be at least 5 minutes**")
    let split = message.suffixOf(3).split("|")
    if (!split[0]) return send("**Split your options with the character `|`**")
    if (split.length < 4) return send("**You must have at least 2 options")
    let quest = split[0]
    split = split.slice(1).map(t => t.trim())
    let options = split.map(t => {
      return {content: t, votes: 0}
    })
    message.guild.add("apoll", {author: message.author.id, total: 0, options: options, quest: quest})
    message.author.purge("apoll")
    send("**Respond with `endpoll` in <#" + voting.id + "> to end the poll early.**")
    display.send(`**__${quest}__**

${split.map((t, i) => "**" + (i + 1) + ". " + t + "**").join("\n")}

You can vote with \`${message.prefix}vote <option number>\` in the voting channel <#${voting.id}>`)

    let collector = voting.createMessageCollector(m => m.author.bot !== true, {time: time.milliseconds()})
    collector.on("collect", msg => {
      if (msg.content === "endpoll") {
        let id = msg.guild.check("apoll")
        if (!id || !id.author) throw new Error("Author was not defined in admin poll")
        if (msg.author.id === id.author || msg.channel.permissionsFor(msg.author).has("MANAGE_GUILD")) {
          collector.stop()
        }
      }
      if (!msg.content.startsWith(msg.prefix + "vote")) return
      if (msg.author.check("apoll")) return msg.channel.send("**You have already voted**")
      let num = parseInt(msg.args[0]) || "invalid"
      let poll = msg.guild.check("apoll")
      if (!poll) throw new Error("Couldn't fetch poll")
      if (num === "invalid" || num < 1 || num > poll.options.length + 1) return msg.channel.send("**Invalid option number**")
      msg.delete()
      poll.options[num - 1].votes++
      poll.total++
      msg.channel.send("**Vote Collected**").then(m => m.delete(14000))
      msg.guild.add("apoll", poll)
      msg.author.add("apoll")
    })

    collector.on("end", () => {
      let poll = message.guild.check("apoll")
      if (!poll) throw new Error("Couldn't fetch poll")
      if (poll.total === 0) return display.send("**Poll Results:**\nNobody Voted")
      let top = poll.options.sort((a, b) => {
        return b.votes - a.votes
      })
      let star = []
      let under = top.slice(0)
      let topValue = top[0].votes
      top.forEach(t => {
        if (t.votes === topValue) star.push(t), under = under.slice(1)
      })
      let txt = `**Poll Results:**
Total Votes: ${poll.total}

**__${poll.quest}__**

${star.map(t => `:star: **${t.content}:** \`${t.votes}\` :star:`).join("\n")}

${under.map(t => `**${t.content}: ** \`${t.votes}\``).join("\n")}`
      display.send(txt)
    })
  }

})
