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

  succ(text, data) {
    text = text.replace(/\*/g, "")
    if (Array.isArray(data)) data = data.join(", ")
    return `<:tickmarkYes:340357547141627905> **| ${text}** ${data || ""}`
  }

  fail(text, data) {
    text = text.replace(/\*/g, "")
    if (Array.isArray(data)) data = data.join(", ")
    return `<:tickmarkNo:340357547682955264> **| ${text}** ${data || ""}`
  }


}

module.exports = ClientExtension