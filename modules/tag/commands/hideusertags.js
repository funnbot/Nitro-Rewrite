const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Hide tags made by normal users from the listtags command.",
    example: "${p}hideusertags",
    argExample: "",
    dm: false,
    coolDown: 1,
    userPerms: 2,

    run: async(message, bot, send) => {
        let conf = message.guild.get("Tag", "hideuser");
        message.succ(`${conf ? "Disabled" : "Enabled" } hide user tags.`);
        message.guild.set("Tag", "hideuser", !conf);
    }
})