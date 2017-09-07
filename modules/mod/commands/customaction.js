const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "[WIP] Collect users and apply custom action.",
    example: "${p}customaction joined ",
    argExample: "",
    dm: false,
    coolDown: 1,
    userPerms: 1,
    botPerms: [],

    alias: ["caction"],
    args: [],

    run: async(message, bot, send) => {
        //TODO: Finish custom action
        return send("**This command is WIP**")
    }
})