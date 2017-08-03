const Extension = require("./Extension.js")
const chalk = require("chalk")

class ClientExtension extends Extension {

  get logger() {
    return {
      info: (info) => {
        console.log(chalk.blue(info))
      },
      warning: (warning) => {
        console.log(chalk.yellow(warning))
      },
      error: (error) => {
        console.log(chalk.red(error))
      }
    }
  }

}

module.exports = ClientExtension