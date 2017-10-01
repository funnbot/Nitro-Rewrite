const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Remove curses from user's nicknames.",
    example: "${p}nocurse",
    userPerms: 2,
    botPerms: ["MANAGE_NICKNAMES"],

    run: async(message, bot, send) => {
        const conf = message.guild.get("Nickname", "curse");
        if (conf) message.succ("Disabled nocurse");
        else message.succ("Enabled nocurse");
        message.guild.set("Nickname", "curse", !conf);
    }
})