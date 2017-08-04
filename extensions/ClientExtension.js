const Discord = require("discord.js")
const Extension = require("./Extension.js")
const chalk = require("chalk")
const config = require("../config.js")
config.auth = require("../auth.js")

class ClientExtension extends Extension {

  get config () {
    return config
  }

  get Embed () {
    return Discord.MessageEmbed()
  }

  get logger () {
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