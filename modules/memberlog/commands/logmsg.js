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
        prompt: "With what message?"
    }],

    run: async(message, bot, send) => {
        if (message.args[0] === "join") {
            
        }
    }
})