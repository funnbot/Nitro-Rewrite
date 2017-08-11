const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Trade money with friends.",
    example: "${p}trade @Funnbot 100000000",
    argExample: "<user> <amount>",
    alias: ["tradebal"],
    args: [
        {
            type: "number",
            prompt: "How much?",
        },
        {
            type: "user",
            prompt: "With who?"
        }
    ],

    run: async(message, bot, send) => {
        if (message.args[1].id === message.author.id) return message.fail("You can't trade money with yourself.")
        let g = message.guild
        let tbal = bot.moneyman.getMoney(g, message.args[1])
        let abal = bot.moneyman.getMoney(g, message.author)
        let am = message.args[0]

        if (am > abal) return message.fail("You don't have that much money.")
        tbal = tbal + am
        abal = abal - am
        bot.moneyman.setMoney(g, message.args[1], tbal)
        bot.moneyman.setMoney(g, message.author, abal)
        return message.succ(`New balances - ${message.author.tag}: ${Nitro.util.formatBal(abal)}, ${message.args[1].tag}: ${Nitro.util.formatBal(tbal)}`)
    }
})