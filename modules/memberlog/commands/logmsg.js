const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Setup member log.",
    example: "${p}setuplog join Welcome {user} to our server! || ${p}setuplog leave {user} has left.",
    argExample: "",
    userPerms: 2,
    args: [{
        type: "selection",
        prompt: "Are you setting the `join` message, or the `leave` message",
        opts: ["join", "leave"]
    }, {
        type: "string",
        prompt: "With what message?",
        optional: true
    }],

    run: async(message, bot, send) => {
        let content = message.args[1] || false
        let c = bot.memberlog.g(message.guild)
        if (!content) {
            delete c[message.args[0]]
            bot.memberlog.s(message.guild, c)
            return message.succ("Disabled " + message.args[0] + " messages.")
        }
        if (message.args[0] === "join") {
            
        }
    }
})