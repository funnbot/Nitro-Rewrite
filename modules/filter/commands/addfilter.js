const Nitro = require("../../../Nitro.js")
const filterpacks = require("../filterpack.js");
const { MAXFILTERS } = Nitro.config;

module.exports = new Nitro.Command({
    help: "Enable a filter or filterpack",
    example: "${p}addfilter damnit || ${p}addfilter adverts",
    argExample: "<filter or filter pack>",
    userPerms: 2,
    args: [{
        prompt: "What should I filter? A phrase or a filterpack",
        type: "string"
    }],

    run: async(message, bot, send) => {
        let conf = message.guild.get("Filter", "filters");
        if (Object.keys(conf).length > MAXFILTERS) return message.fail("Max filter limit reached:", MAXFILTERS);
        let f = message.args[0];
        if (filterpacks[f]) {
            let fp = message.guild.get("Filter", "filterpacks");
            fp[f] = true;
            message.guild.set("Filter", "filterpacks", fp);
            return message.succ("Enabled filter pack", f);
        }
        conf[f] = true;
        message.guild.set("Filter", "filters", conf);
        return message.succ("Added filter:", f);
    }
})