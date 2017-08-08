const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Edit a user's balance.",
    example: "${p}editbalance Funnbot add 4000 || ${p}editbalance Funnbot set 1200 || ${p}editbalance Funnbot remove 300",
    argExample: "<user> <method> <amount>",
    userPerms: 2,
    alias: ["editbal", "editmoney"],

    args: [
        {
            prompt: "Who's balance?",
            type: "user"
        },
        {
            prompt: "What action?",
            type: "selection",
            opts: ["set", "add", "remove"]
        },
        {
            prompt: "How much?",
            type: "number",
            max: 1000000000,
        }
    ],

    run: async(message, bot, send) => {
        let id = message.args[0]
        let bal = bot.moneyman.getMoney(message.guild, id)
        let am = message.args[2]

        let args = {
            add() {
                bot.moneyman.addMoney(message.guild, id, am)
            },
            set () {
                bot.moneyman.setMoney(message.guild, id, am)
            },
            remove() {
                let newAm = bal - am
                bot.moneyman.setMoney(message.guild, id, newAm)
            }
        }
        if (args[message.args[1]]) {
            args[message.args[1]]()
        } else return message.fail("Invalid Argument:", "Try `add`, `set`, `remove`")
        let newBal = Nitro.util.formatBal(bot.moneyman.getMoney(message.guild, id))
        message.succ(`${id.tag}'s new balance is ${newBal}`)
    }
})