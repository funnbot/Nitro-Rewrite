const child_process = require("child_process")
const fs = require("fs")

process.env.MOD ? start(process.env.MOD) : fs.readdirSync("./modules").forEach(module => start(module))

function start(module) {
  if (module === ".DS_Store") return
  fs.existsSync(`./modules/${module}/ShardingManager.js`) ? child_process.fork(`./modules/${module}/ShardingManager.js`) : console.log(`module ${module} is missing Sharding Manager.`)
}