const { fork } = require("child_process")
const fs = require("fs")

let start = (mod) => {
  if (mod === ".DS_Store") return
  if (fs.existsSync(`./modules/${mod}/bot.js`)) fork("./struct/ShardingManager", [], {env: {MODULE: mod}})
  else console.log(`module ${mod} is missing bot.js`)
}

if (process.env.MOD) start(process.env.MOD)
else fs.readdirSync("./modules").forEach(start)