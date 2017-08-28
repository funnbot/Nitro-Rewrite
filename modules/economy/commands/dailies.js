const Nitro = require("../../../Nitro.js");
const time = 864e5;

module.exports = new Nitro.Command({
    help: "Claim daily rewards.",
    example: "",

    run: async(message, bot, send) => {
        let get = message.author.storage.get("dailies");
        if (get && get + time > Date.now()) return send("Dailies refreshes every 24 hours.".bold());
        else message.author.storage.delete("dailies");
        message.author.storage.set("dailies", Date.now())
        let am = Nitro.util.random100(.5, 5);
        message.member.addBalance(am);
        return send(`Here is your daily ${Nitro.util.formatBal(am)}`.bold())
    }
});