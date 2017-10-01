const Nitro = require("../../../Nitro.js")
const filterpacks = require("../filterpack.js");
const regRep = require("escape-string-regexp");
const { MAXFILTERS } = Nitro.config;

module.exports = new Nitro.Command({
    help: "Disable a filter or filterpack",
    example: "${p}delfilter damnit || ${p}delfilter adverts",
    argExample: "<filter or filter pack>",
    userPerms: 2,
    alias: ["filterdel"],
    args: [{
        prompt: "What should I remove? A phrase or a filterpack",
        type: "string"
    }],

    run: async(message, bot, send) => {
        let conf = message.guild.get("Filter", "filters");

        let f = message.args[0];
        if (!f) return send("No argument provided.")
        f = f.toLowerCase();
        if (filterpacks[f]) {
            let fp = message.guild.get("Filter", "filterpacks");
            if (!fp[f]) return message.fail("Filterpack was already disabled.")
            delete fp[f];
            message.guild.set("Filter", "filterpacks", fp);
            return message.succ("Disabled filter pack", f);
        }
        if (!conf[f]) return message.fail("Filter was never added.")
        delete conf[f];
        let reg = makeReg(conf)
        message.guild.set("Filter", "filters", conf);
        message.guild.set("Filter", "filterRegExp", reg);
        return message.succ("Removed filter:", f);
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