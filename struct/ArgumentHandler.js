const util = require("./util.js")

const maxStringLength = 1000
const minNumber = -(2 ** 51)
const maxNumber = 2 ** 51

const validate = {
  user(val) {
    return /^.{2,32}$/.test(val)
  },
  string(val) {
    if (typeof val == "string") {
      return val.length < maxStringLength
    }
  },
  word(val) {
    return validate.string(val) && !val.includes(" ")
  },
  number(val) {
    if (typeof val == "number") {
      return val > minNumber && val < maxNumber
    }
  },
  user(val) {
    return validate.string(val) && /^.{2,32}#[0-9]{4}$/.test(val)
  },
  channel(val) {
    return validate.string(val) && /^#\d+$/.test(val)
  },
  duration(val) {
    return validate.string(val) && /^(\d{1,2}h)?(\d{1,2}m)?(\d{1,2}s)?$/.test(val)
  }
}

class Argument {

  constructor(arg, index, messageArgs, message) {
    this.prompt = arg.prompt // When first collecting it asks this prompt
    this.failed = arg.failed // If First collected is invalid, it asks again with more information
    this.type = arg.type // The type of the argument string, name, number, user, channel, role, selection, duration
    this.options = arg // Get the rest of the options
    this.index = index // The index of the argument
    this.msg = messageArgs // message.args array
    this.message = message;

    this._validateType() // Validate the argument type
  }

  async run(guild) {
    //First it is checking if the argument exists
    if (this._exists()) {
      //If it does exist then it validates
      if (!this._validateContent()) {
        //If it dosnt exist or it dosnt validate, it collects a new one
        await this._collect()
      } else return
    }
    else this._collect()
    //Then it validates if the existing argument fits the type if it exists

    //It validates again
    //If everything is validated properly, it can then be parsed according to type, if not, it will ask again
    //If the parse fails, it will ask again
  }

  _exists() {
    return this.msg[this.index]
  }

  _validateContent(content) {
    return validate[this.type](content)
  }

  _validateType() {
    if (!validate[this.type]) throw new TypeError("Invalid type " + this.type)
  }
  _collect() {
    this.message.channel.send(this.prompt)
  }
}

module.exports = class ArgumentHandler {

  static async run(message, args) {
    if (args.length < 1) return
    for (let [i, arg] of args.entries()) {
      let Arg = new Argument(arg, i, message.args, message)
      message.args[i] = await Arg.run()
    }
  }

}

module.exports.validate = validate