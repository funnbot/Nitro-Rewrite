const Nitro = require("../../../Nitro.js")
const Duration = require("duration-js")

module.exports = new Nitro.Command({
    help: "The old poll command.",
    example: "${p}poll 10m30s What is the best bot? | Nitro | Mee6 | Funnbot",
    argExample: "<time> <question> | <option1> | <option2> | ...",
    dm: false,
    coolDown: 10,
    userPerms: 0,

    args: [{
            desc: "How long will it run?\nEx. 10m30s - 10 minutes and 30 seconds, 180m - 3 hours",
            type: "name"
        },
        {
            desc: "What is the question and options?\nSeparate with the character: `|`\nEx. `What is the best bot? | Nitro | Mee6 | Funnbot`",
            type: "text"
        }
    ],

    run: async(message, bot, send) => {
        if (message.channel.check("poll")) return send("**There is already a poll running**")
        let time = message.args[0]
        if (!time) return send("**How long will it run?**\nEx. 10m30s - 10 minutes and 30 seconds, 180m - 3 hours")
        try {
            time = new Duration(time)
        } catch (err) {
            return send("**The time was not formatted correctly**")
        }
        if (time.hours() > 5) return send("**Polls can not be longer than 4 hours.**")
        if (time.seconds() < 30) return send("**Polls must be at least 30 seconds**")
        let split = message.suffixOf(1).split("|")
        if (!split[0]) return send("**Split your options with the character `|`**")
        if (split.length < 3) return send("**You must have at least 2 options**")
        let quest = split[0]
        split = split.slice(1).map(t => t.trim())
        let options = split.map(t => {
            return { content: t, votes: 0 }
        })
        message.channel.add("poll", { author: message.author.id, total: 0, options: options, quest: quest })
        message.author.purge("poll")
        send(`**__${quest}__**\n
${split.map((t, i) => "**" + (i + 1) + ". " + t + "**").join("\n")}\n
You can vote with \`${message.prefix}vote <option number>\`
Respond with \`endpoll\` to end the poll early.`)

        let collector = message.channel.createMessageCollector(m => m.author.bot !== true, { time: time.milliseconds() })
        collector.on("collect", msg => {
            if (msg.content === "endpoll") {
                let id = message.channel.check("poll")
                if (!id || !id.author) throw new Error("Author was not defined in poll")
                if (msg.author.id === id.author || message.channel.permissionsFor(msg.author).has("MANAGE_GUILD")) {
                    collector.stop()
                }
            }
            if (!msg.content.startsWith(message.prefix + "vote")) return
            if (msg.author.check("poll")) return send("**You have already voted**")
            let num = parseInt(msg.args[0]) || "invalid"
            let poll = message.channel.check("poll")
            if (!poll) throw new Error("Couldn't fetch poll")
            if (num === "invalid" || num < 1 || num > poll.options.length + 1) return send("**Invalid option number**")
            msg.delete()
            poll.options[num - 1].votes++
                poll.total++
                send("**Vote Collected**").then(m => m.delete(7000))
            msg.channel.add("poll", poll)
            msg.author.add("poll")
        })

        collector.on("end", (collected, reason) => {
            let poll = message.channel.check("poll")
            if (!poll) throw new Error("Couldn't fetch poll")
            if (poll.total === 0) return send("**Poll Results:**\nNobody Voted")
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
            send(txt)
        })
    }
})