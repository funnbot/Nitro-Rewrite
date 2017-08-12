const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Trivia leaderboard",
    example: "${p}triviatop",

    run: async(message, bot, send) => {
        let users = bot.trivia.settings
        users = Object.entries(users).sort(([na, va], [nb, vb]) => {
            return vb - va
        }).slice(0, 19)
        let num = 1
        let txt = []
        for (let [id, wins] of users) {
            let user = {}
            try {
                user = bot.users.get(id)
                if (!user) user = await bot.fetchUser(id)
            } catch(e) {
                user.tag = "User Left"
                console.log(e)
            }
            let tag = Nitro.util.escapeMarkdown(user.tag)
            txt.push(`**${num}.** ${tag} (${wins})`)
            num++
        }
        let embed = new bot.Embed()
        embed.description = txt.join("\n")
        embed.setTitle("`Trivia Leaderboard`")
        embed.setColor(embed.randomColor)

        send({embed})
    }
})