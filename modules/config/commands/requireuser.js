const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Toggle, whether a user needs the User role to run commands.",
    example: "${p}requireuser",
    argExample: "",
    dm: false,
    coolDown: 1,
    userPerms: 2,

    run: async(message, bot, send) => {
        let config = message.guild.get("UserPerm")
        if (config) send("**Users no longer require the role `User` to use Nitro's commands.**")
        else send("**Users now require a role named `User` to use Nitro's commands.**")
        message.guild.set("UserPerm", !config);
    }
})