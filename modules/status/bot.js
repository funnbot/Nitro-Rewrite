const { NitroClient, MessageHandler, Cycler } = require("../../Nitro.js");
const bot = new NitroClient("status", {
    disableDefaultTables: true
});
bot.once("ready", () => {
    require("./statistics.js")
    const c = new Cycler(0, 2);
    async function game() {
        const games = [
            `Shard ${bot.shard.id+1}/${bot.shard.count}`,
            `Latency ${bot.ping}MS`,
            `Guilds ${await bot.shard.clientValuesReduced("guilds.size")}`,
            "16 Modules"
        ];
        bot.user.setActivity("@Nitro help | " + games[c.int]);
        c.inc();
        setTimeout(() => game(), 60000);
    }
    game()
})
module.exports = bot