const Argument = require("./Argument.js")

module.exports = class ArgumentHandler {

  static async run(message, args) {
    if (args.length < 1) return
    for (let [i, arg] of args.entries()) {
      let Arg = new Argument(arg, i, message)
      message.args[i] = await Arg.run()
    }
  }

}