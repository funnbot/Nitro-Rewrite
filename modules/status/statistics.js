const bot = require("./bot.js")
const { CHANNELS } = require("../../config.js")
const fs = require("fs")

async function loop() {
    let channel = bot.channels.get("341038206994743297")
    if (!channel) return
    let message
    let stats = {}
    try {
        message = await channel.fetchMessage(CHANNELS.STATUS)
        stats.guilds = await bot.shard.fetchClientValues("guilds.size")
        stats.channels = await bot.shard.fetchClientValues("channels.size")
        stats.users = await bot.shard.fetchClientValues("users.size")
        stats.guilds = stats.guilds.reduce((prev, val) => prev + val, 0)
        stats.channels = stats.channels.reduce((prev, val) => prev + val, 0)
        stats.users = stats.users.reduce((prev, val) => prev + val, 0)
    } catch (err) {
        console.log(err)
        return
    }
    fs.readdir("./modules", (err, modules) => {
        if (err) return console.log("Failed to read modules")
        stats.modules = modules.length
        let embed = new bot.embed()
        embed.setTitle("`[ Live Statistics ]`")
            .addField("`Guilds`", stats.guilds, true)
            .addField("`Channels`", stats.channels, true)
            .addField("`Users`", stats.users, true)
            .addField("`Shards`", bot.shard.count, true)
            .addField("`Modules`", stats.modules, true)
            .setColor(embed.randomColor)
            .setTimestamp(new Date())
        message.edit("", { embed })
        setTimeout(() => loop(), 300000)
    })
}

loop().then()