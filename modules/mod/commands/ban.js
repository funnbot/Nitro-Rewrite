const Nitro = require("../../../Nitro.js")
module.exports = new Nitro.Command({
    help: "Ban a user.",
    example: "${p}ban Funnbot Spamming chat with memes.",
    argExample: "<user> <reason>",
    dm: false,
    coolDown: 1,
    userPerms: 1,
    botPerms: ["BAN_MEMBERS"],

    args: [
        {
            prompt: "Which user?",
            type: "user",
        },
        {
            prompt: "For what reason?",
            type: "string",
            optional: true
        }
    ],

    run: async(message, bot, send) => {
        if (!message.checkSuffix) return send("**Example: " + module.exports.example.replace("${p}", message.prefix) + "**")
        let user = message.args[0];
        if (!user) return send("**User not found**");
        let reason = message.args[1] || null;
        if (!message.guild.member(user).bannable) return send("**I am unable to ban the user:** " + user.tag)
        let embed = new bot.Embed()
            .setDescription(`**Are you sure you want to ban the user: ${user.tag}**`)
            .setAuthor(bot.user.username, bot.user.avatarURL())
            .setFooter("yes/no")
            .nitroColor()
            .setTimestamp(new Date());
        send("", { embed }).then(async msg => {
            let failsafe = await message.collectMessage(["yes", "y", "yup"], ["no", "n", "nope"], "author")
            if (!failsafe) return msg.edit("**Ban Cancelled**", { embed: null })
            let options = reason ? { reason, days: 1 } : { days: 1 }
            try {
                await msg.edit("**Banning user...**", { embed: null })
                await user.send(`**You have been banned from ${message.guild.name}**\n\n**Reason:** ${reason || "None"}`)
            } catch (err) {
                console.log(err)
            }
            try {
                //await member.ban(options)
                let caseman = message.guild.check("caseman")
                if (!caseman) throw new Error("CaseManager was not initialized.")
                caseman.newCase(message.author, user, "ban", { reason: reason })
            } catch (err) {
                console.log(err);
                return msg.edit("**I was unable to ban the user:** " + user.tag);
            }
            msg.edit("**Ban complete**");
        })
    }
})