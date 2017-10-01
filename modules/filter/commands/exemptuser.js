const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Exempt users, channels, or roles from the filter.",
    example: "${p}filterexc add @Funnbot || ${filterexc} add @Admins || ${p}filterexc del #advertisements",
    argExample: "<add/del> <user/channel/role>",
    userPerms: 2,
    coolDown: 10,
    args: [{
        prompt: "`add` or `del`",
        type: "selection",
        opts: ["add", "del"]
    }, {
        prompt: "A user, channel, or role.",
        type: "string",
    }],

    run: async(message, bot, send) => {

    }
})