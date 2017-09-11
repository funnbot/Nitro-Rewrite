const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Trivia leaderboard",
    example: "${p}triviatop",

    run: async(message, bot, send) => {
        let users = message.guild.table("Trivia").cache;
        users = users.sort((a, b) => {
            return b - a;
        });
        users = Array.from(users.entries()).slice(0, 19);
        let num = 1;
        let txt = [];
        for (let [id, wins] of users) {
            let user = {};
            try {
                user = bot.users.get(id);
                if (!user) user = await bot.users.fetch(id);
            } catch (e) {
                user.tag = "User Left";
                console.log(e);
            }
            let tag = Nitro.util.escapeMarkdown(user.tag);
            txt.push(`**${num}.** ${tag} (${wins})`);
            num++;
        }
        let embed = new bot.Embed();
        embed.description = txt.join("\n");
        embed.setTitle("`Trivia Leaderboard`");
        embed.setColor(embed.randomColor);

        send({ embed });
    }
})