const Nitro = require("../../../Nitro.js")
let opts = Object.entries(Nitro.config.STOCKS).map(([k, v]) => v.key)

module.exports = new Nitro.Command({
    help: "List available stocks and their worth",
    example: "${p}stocks",
    userPerms: 0,
    alias: ["liststocks"],

    args: [{
        type: "user",
        prompt: "Whos stocks?",
        optional: true
    }],

    run: async(message, bot, send) => {
        let m = bot.stockmarket.createList(message.guild, message.args[0] || message.author)
        return send(m, { code: "diff" })
    }
})