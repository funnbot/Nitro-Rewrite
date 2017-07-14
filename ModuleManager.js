const child_process = require("child_process")
const fs = require("fs")

let modules = fs.readdirSync("./modules")

modules.forEach(module => {

  if (module !== ".DS_Store") {
    let exist = fs.existsSync(`./modules/${module}/ShardingManager.js`)
    if (!exist) console.log(`module ${module} is missing Sharding Manager.`)
    else setTimeout(() => child_process.fork(`./modules/${module}/ShardingManager.js`), 2000)
  }

})
