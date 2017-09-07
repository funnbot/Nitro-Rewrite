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
        prompt: "What message will be sent?",
        optional: true
    }],

    run: async(message, bot, send) => {
        let content = message.args[1] || false
        let config = message.guild.get("MemberLog", message.args[0])
        if (!content) {
            if (!config) {
                return send("**Set the messages sent when a user joins or leaves.**");
            }
            message.guild.set("MemberLog", message.args[0], null)
            return message.succ("Disabled " + message.args[0] + " messages.")
        }
        message.guild.set("MemberLog", message.args[0], content);
        return message.succ("Join message set")
    }
})