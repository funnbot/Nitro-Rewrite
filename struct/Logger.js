const chalk = require("chalk")

class Logger {

  static info(info) {
    console.log(chalk.blue(info))
  }

  static warning(warning) {
    console.log(chalk.yellow(warning))
  }

  static error(error) {
    console.log(chalk.red(error))
  }

}

Nitro.logger = Logger