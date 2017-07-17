const Discord = require("discord.js")
const {TOKEN, SHARDS} = require("../../config.js")

const ShardingManager = new Discord.ShardingManager("./modules/dev/bot.js", {totalShards: SHARDS, token: TOKEN})
ShardingManager.spawn()
