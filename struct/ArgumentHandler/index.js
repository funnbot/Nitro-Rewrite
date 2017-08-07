const Argument = require("./Argument.js")

module.exports = class ArgumentHandler {

  static async run(message, args) {
    if (args.length < 1) return
    for (let [i, arg] of args.entries()) {
      let final = i === message.args.length - 1
      let Arg = new Argument(arg, i, message)
      message.args[i] = await Arg.run()
    }
  }

}