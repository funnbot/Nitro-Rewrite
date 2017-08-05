const Discord = require("discord.js")
const {TOKEN} = require("../auth.js")
const {SHARDS} = require("../config.js")
let mod = process.env.MODULE
if (!mod) throw new Error("Missing Module Env Variable")

const ShardingManager = new Discord.ShardingManager(`./modules/${mod}/bot.js`, {
  totalShards: SHARDS,
  token: TOKEN
})

ShardingManager.spawn().catch(console.log)
