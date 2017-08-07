const util = require("./util.js")
const Duration = require("duration-js")

// :facepalm:
//I set min *default* number to 1 because in general cases we dont want negatives.
const def = {
  maxStringLength: 2000,
  maxNumber: 2**31-2,
  minNumber: 1
}
//Its 31 because thats a 32 bit number, i dont see any reason why we need greater than 32 bit number...
/* Types
string - A string of any kind, 
 options: max - The maximum string length
word - Single 
 */

const validate = {
  user(val) {
    return /^.{2,32}$/.test(val)
  },
  string(val) {
    if (typeof val === "string") {
      return val.length < maxStringLength
    }
  },
  word(val) {
    return validate.string(val) && !val.includes(" ")
  },
  number(val) {
    val = parseInt(val) || false
    return typeof val === "number" && (val > minNumber && val < maxNumber)
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

const parse = {

}

class Argument {

  constructor(arg, index, messageArgs, guild) {
    this.prompt = arg.prompt // When first collecting it asks this prompt
    this.failed = arg.failed // If First collected is invalid, it asks again with more information
    this.type = arg.type // The type of the argument string, name, number, user, channel, role, selection, duration
    this.options = arg // Get the rest of the options
    this.index = index // The index of the argument
    this.msg = messageArgs // message.args array
    this.guild = guild || false // If false this is a DM channel

    this._validateType() // Validate the argument type
  }

  async run() {
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
    return this.msg[this.index] || false
  }

  _validateContent(content) {
    return validate[this.type](content)
  }

  _validateType() {
    if (!validate[this.type]) throw new TypeError("Invalid type " + this.type)
    //I know that duplication of all types is annoying, but theres options that i want...
  }
  _collect() {
    this.message.channel.send(this.prompt)
  }
}

module.exports = class ArgumentHandler {

  static async run(message, args) {
    if (args.length < 1) return
    for (let [i, arg] of args.entries()) {
      let Arg = new Argument(arg, i, message.args, message.guild)
      message.args[i] = await Arg.run()
    }
  }

}

module.exports.validate = validate