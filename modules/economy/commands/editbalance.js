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
        let member = message.guild.member(message.args[0]);
        let am = message.args[2]

        let args = {
            add() {
                member.addBalance(am);
            },
            set () {
                member.balance = am;
            },
            remove() {
                member.removeBalance(am);
            }
        }
        if (args[message.args[1]]) {
            args[message.args[1]]()
        } else return message.fail("Invalid Argument:", "Try `add`, `set`, `remove`")
        let newBal = member.balFormat()
        message.succ(`${member.user.tag}'s new balance is ${newBal}`)
        return
    }
})