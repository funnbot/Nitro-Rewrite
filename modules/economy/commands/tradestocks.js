const Nitro = require("../../../Nitro.js")
let opts = Object.entries(Nitro.config.STOCKS).map(([k, v]) => v.key)

module.exports = new Nitro.Command({
    help: "Buy or sell stocks.",
    example: "${p}tradestocks buy NTO 4 || ${p}tradestocks sell DSC 2",
    argExample: "<buy/sell> <stockKey> <amount>",
    alias: ["tstock"],
    args: [{
        type: "selection",
        prompt: "Which option?",
        opts: ["buy", "sell"]
    }, {
        type: "selection",
        prompt: "Which stock?",
        opts
    }, {
        type: "number",
        max: 100,
        min: 1, 
        prompt: "How many?"
    }],

    run: async(message, bot, send) => {
        let go = bot.stockmarket[message.args[0]](message.guild, message.author, message.args[1], message.args[2])
        if (typeof go === "string") return message.fail(go)
        return message.succ("Transaction Successful")
    }
})