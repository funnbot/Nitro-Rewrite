const child_process = require("child_process")
const fs = require("fs")

let modules = fs.readdirSync("./modules")

modules.forEach(module => {

  if (module !== ".DS_Store") {

    child_process.fork(`./modules/${module}/ShardingManager.js`)

  }

})
