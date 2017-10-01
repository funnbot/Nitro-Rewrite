const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Make all users nicknames mentionable.",
    example: "${p}mentionable",
    userPerms: 2,
    botPerms: ["MANAGE_NICKNAMES"],

    run: async(message, bot, send) => {
        const conf = message.guild.get("Nickname", "mention");
        if (conf) message.succ("Disabled mentionable");
        else message.succ("Enabled mentionable");
        message.guild.set("Nickname", "mention", !conf);
    }
})