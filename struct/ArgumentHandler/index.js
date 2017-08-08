const Argument = require("./Argument.js")

module.exports = class ArgumentHandler {

  static async run(message, args) {
    if (args.length < 1) return true
    if (message.author.check("argumenthandler")) return true
    message.author.add("argumenthandler")
    for (let [i, arg] of args.entries()) {
      let final = i === message.args.length - 1
      let Arg = new Argument(arg, i, message)
      message.args[i] = await Arg.run()
      if (message.args[i].invalid) {
        message.author.del("argumenthandler")
        return message.send("Cancelled")
      }
    }
    message.author.del("argumenthandler")
    return false
  }

}