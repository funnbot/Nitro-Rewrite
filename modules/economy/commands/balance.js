const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "How much USD you have.",
    example: "${p}money @Funnbot",
    argExample: "<user>",
    dm: false,
    coolDown: 4,
    userPerms: 0,
    alias: ["money", "bal"],

    args: [{
        prompt: "Whos balance?",
        optional: true,
        type: "user"
    }],

    run: async(message, bot, send) => {
        let member = message.guild.member(message.args[0]) || message.member
        return send(`${member.user.tag}'s current balance is ${member.balFormat()}`.bold())
    }
})