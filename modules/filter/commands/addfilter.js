const Nitro = require("../../../Nitro.js")
const filterpacks = require("../filterpack.js");
const regRep = require("escape-string-regexp");
const { MAXFILTERS } = Nitro.config;

module.exports = new Nitro.Command({
    help: "Enable a filter or filterpack",
    example: "${p}addfilter damnit || ${p}addfilter adverts",
    argExample: "<filter or filter pack>",
    userPerms: 2,
    botPerms: ["MANAGE_MESSAGES"],
    alias: ["filteradd"],
    args: [{
        prompt: "What should I filter? A phrase or a filterpack",
        type: "string"
    }],

    run: async(message, bot, send) => {
        let conf = message.guild.get("Filter", "filters");
        if (Object.keys(conf).length > MAXFILTERS) return message.fail("Max filter limit reached:", MAXFILTERS);
        let f = message.args[0];
        if (!f) return send("No argument provided.")
        f = f.toLowerCase();
        if (filterpacks[f]) {
            let fp = message.guild.get("Filter", "filterpacks");
            if (fp[f]) return message.fail("Pack already enabled.")
            fp[f] = true;
            message.guild.set("Filter", "filterpacks", fp);
            return message.succ("Enabled filter pack", f);
        }
        if (conf[f]) return message.fail("Filter already added.")
        conf[f] = true;
        let reg = makeReg(conf)
        message.guild.set("Filter", "filters", conf);
        message.guild.set("Filter", "filterRegExp", reg);
        return message.succ("Added filter:", f);
    }
})

function makeReg(conf) {
    let res = []
    for (let val of Object.keys(conf)) {
        val = regRep(val);
        res.push(val);
    }
    if (res.length === 0) return null;
    return res.join("|");
}