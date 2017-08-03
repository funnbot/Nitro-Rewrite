const childProcess = require("child_process")
const fs = require("fs")

let start = (module) => {
  if (module === ".DS_Store") return
  if (fs.existsSync(`./modules/${module}/ShardingManager.js`)) childProcess.fork(`./modules/${module}/ShardingManager.js`)
  else console.log(`module ${module} is missing Sharding Manager.`)
}

if (process.env.MOD) start(process.env.MOD)
else fs.readdirSync("./modules").forEach(start)
