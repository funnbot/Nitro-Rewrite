const Discord = require("discord.js")
const {TOKEN} = require("../../auth.js")
const {SHARDS} = require("../../config.js")

const ShardingManager = new Discord.ShardingManager("./modules/tag/bot.js", {totalShards: SHARDS, token: TOKEN})
ShardingManager.spawn()
