const Nitro = require("../../../Nitro.js")
const Paginator = require("../../../struct/Paginator.js")
const escapeMD = require("discord.js").escapeMarkdown

module.exports = new Nitro.Command({
    help: "Richest users leaderboard.",
    example: "${p}baltop",
    arg: [{
        type: "number",
        prompt: "What page?",
        min: 1
    }],

    run: async(message, bot, send) => {
        let page = message.args[0] || 1
        let top = message.member.balTop
        let pages = new Paginator(top)
        pages.paginate(20)
        let top20 = pages.getPage(page - 1)

        let txt = []
        for (let [index, [id, v]] of top20) {
            let user = {}
            try {
                user = bot.users.get(id)
                if (!user) user = await bot.users.fetch(id)
            } catch (err) {
                user.tag = "User Left"
            }

            let tag = escapeMD(user.tag)
            let bal = Nitro.util.formatBal(v.money || 0, true)
            let t = `**${index + 1}.** ${user.tag} **—** ${bal}`
            txt.push(t)
        }

        let embed = new bot.Embed()
        embed.setTitle("Balance Leaderboard")
        embed.description = txt.join("\n")
        embed.setColor(embed.randomColor)
        embed.setFooter(`Page ${page}/${pages.pages.length}`)

        return send("", { embed })
    }
})