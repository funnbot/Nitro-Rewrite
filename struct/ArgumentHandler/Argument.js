const util = require("./util.js")
const Duration = require("duration-js")
const Validate = require("./Validate.js")
const Parse = require("./Parse.js")

//I set min *default* number to 1 because in general cases we dont want negatives.
const def = {
    maxStringLength: 2000,
    maxNumber: 2 ** 31 - 2,
    minNumber: 1
}
//Its 31 because thats a 32 bit number, i dont see any reason why we need greater than 32 bit number...
/* Types
string - A string of any kind, 
 options: max - The maximum string length
word - Single word that is valid as channel name (or variable name) this is for consistancy
 options: none
number - A number like amount
 options: max - The maximum number, min - the minimum number
selection - A list of options to select from
 options: opts - The array of options as strings
duration - A duration in the duration-js format
 options: max - The maximum duration in Milliseconds, min - The minimum duration in ms, This is in ms because it lets for finer control without selecting
user - Parse a user from mention, id, name, name#discrim
 options: none
role - Parse a role from mention, id, name
 options: none
channel - Parse a channel from mention, id, name
 options: none
*Possible* custom - A custom match
 options: regex - The regex that it will validate against
 */

//I kindof want to make it, If type = user, role, channel, and they type its name, IF it finds multiples, it will prompt which one they want to select

//We NEED to validate with options... 

class Argument {

    constructor(arg, index, message) {
        this.prompt = arg.prompt // When first collecting it asks this prompt
        this.type = arg.type // The type of the argument string, name, number, user, channel, role, selection, duration
        this.options = arg // Get the rest of the options
        this.index = index // The index of the argument
        this.message = message
        this.dm = message.channel.type === "text" // If its a DM channel or not

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
        } else this._collect()
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
        if (this.type === undefined) throw new TypeError("Type Undefined")
        let typeSetup = {
            string() { this.options.max || (this.options.max = def.maxStringLength) },
            number(val) {
                this.options.max || (this.options.max = def.maxNumber)
                this.options.min || (this.options.min = def.minNumber)
            },
            selection(val) {
                if (!this.options.opts) throw new Error("Missing opts option on selection type")
            },
            custom(val) {
                if (!this.options.regex) throw new TypeError("Missing regex option on custom type")
            }
        }
        if (!this.prompt) throw new Error("Argument missing prompt")
        if (!Validate[this.type]) throw new TypeError("Invalid type " + this.type)
        //I know that duplication of all types is annoying, but theres options that i want... need...
    }
    _collect() {
        this.message.channel.send(this.prompt)
    }
}