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
        let id = message.args[0] || message.author
        let bal = bot.moneyman.getMoney(message.guild, id)
        return send(`${id.tag}'s current balance is ${Nitro.util.formatBal(bal)}`.bold())
    }
})