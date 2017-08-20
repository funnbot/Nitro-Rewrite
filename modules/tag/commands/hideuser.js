const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Hide tags made by normal users from the tags command.",
    example: "${p}hideuser",
    argExample: "",
    dm: false,
    coolDown: 1,
    userPerms: 2,

    run: async(message, bot, send) => {
        // TODO: Remake Tags DB, hide user command.
    }
})