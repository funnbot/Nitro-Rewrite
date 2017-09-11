const Nitro = require("../../../Nitro.js");
const { escapeMarkdown } = Nitro.util;

module.exports = new Nitro.Command({
    help: "Setup member log.",
    example: "${p}mlmessage join Welcome {user} to our server! || ${p}mlmessage leave {embed=#23FFAA} {user} has left.",
    argExample: "",
    userPerms: 2,
    args: [{
        type: "selection",
        prompt: "Are you setting the `join` message, or the `leave` message",
        opts: ["join", "leave"]
    }, {
        type: "string",
        prompt: "`get` - Gets the current set data.\nimage - Uses the image preset\n`<Some Message>` - Sets the message sent.\n`disable` - Disable this message.",
        optional: true
    }],

    alias: ["mlmsg"],

    run: async(message, bot, send) => {
        let content = message.args[1] || false
        let config = message.guild.get("MemberLog", message.args[0])
        if (!content || content === "disable") {
            if (!config) {
                return send("**Set the messages sent when a user joins or leaves first.**");
            }
            message.guild.set("MemberLog", message.args[0], null)
            return message.succ("Disabled " + message.args[0] + " messages.")
        }
        content = escapeMarkdown(content);
        if (content === "get") return config ? send("**The current " + message.args[0] + " message is:** ```md\n" + config + "```") : send("There is no " + message.args[0] + " message set.")
        message.guild.set("MemberLog", message.args[0], content);
        return message.succ("Join message set.", "\n\nTo disable run the command without an argument.")
    }
})