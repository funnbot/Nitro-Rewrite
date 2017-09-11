const Nitro = require("../../../Nitro.js")
const filterpacks = require("../filterpack.js");

module.exports = new Nitro.Command({
    help: "List filter packs.",
    example: "${p}filterpacks",
    userPerms: 2,

    run: async(message, bot, send) => {
        let ls = [];
        for (let [k, v] of Object.entries(filterpacks)) {
            ls.push(`\`${k}\` - ${Object.keys(v).length} words`)
        }
        return send(`**Filter Packs**\n${ls.join("\n")}`)
    }
})