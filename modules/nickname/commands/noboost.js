const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Stop users from boosting their name in member list.",
    example: "${p}noboost",
    userPerms: 2,
    botPerms: ["MANAGE_NICKNAMES"],

    run: async(message, bot, send) => {
        const conf = message.guild.get("Nickname", "boost");
        if (conf) message.succ("Disabled noboost");
        else message.succ("Enabled noboost");
        message.guild.set("Nickname", "boost", !conf);
    }
})