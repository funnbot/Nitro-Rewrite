const Discord = require('discord.js');
const { TOKEN } = require('../../config.js')

const ShardingManager = new Discord.ShardingManager('./modules/dev/bot.js', {totalShards: "auto", token: TOKEN})
ShardingManager.spawn()