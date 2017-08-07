const util = require("../util.js")
const Validate = require("./Validate.js")
const Parse = require("./Parse.js")

//I set min *default* number to 1 because in general cases we dont want negatives.
const def = {
    maxStringLength: 2000,
    maxNumber: 2 ** 31 - 2,
    minNumber: 1,
    maxDuration: 7 * 24 * 60 * 60 * 1000,
    minDuration: 0
}
//Its 31 because thats a 32 bit number, i dont see any reason why we need greater than 32 bit number...
/* Types
globaloptions: time - Default 30 seconds, how long to wait for collector to end, retries - default Infinite, 
how many times to retry getting input if it dosnt validate

string - A string of any kind, 
 options: max - The maximum string length
word - Single word that is valid as channel name (or variable name) this is for consistancy
 options: max - the maximum string length
number - A number like amount
 options: max - The maximum number, min - the minimum number
selection - A list of options to select from
 options: opts - The array of options as strings, ignoreCase - If true, it turns input to lowercase before checking against selection
duration - A duration in the duration-js format
 options: max - The maximum duration in Milliseconds, min - The minimum duration in ms, This is in ms because it lets for finer control without selecting
user - Parse a user from mention, id, name, name#discrim
 options: none
role - Parse a role from mention, id, name
 options: none
channel - Parse a channel from mention, id, name
 options: none
custom - A custom match
 options: regex - The regex that it will validate against
 */

//I kindof want to make it, If type = user, role, channel, and they type its name, IF it finds multiples, it will prompt which one they want to select

//We NEED to validate with options... 

module.exports = class Argument {

    constructor(arg, index, message, final) {
        this.prompt = arg.prompt // When first collecting it asks this prompt
        this.retries = arg.retries || "Infinite" // How many times it asks for a argument if it does not validate
        this.type = arg.type // The type of the argument string, name, number, user, channel, role, selection, duration
        this.options = arg // Get the rest of the options
        this.index = index // The index of the argument
        this.final = final // Whether this is the last argument in the sequence, if it is then we are reading from a suffixOf, not an arg
        this.message = message
        this.dm = message.channel.type === "text" // If its a DM channel or not
        this.content = final ? this.message.suffixOf(this.index) : this.message.args[this.index]
        this._validateType() // Validate the argument type
    }

    async run() {
        let retries = 0
        while (true) {
            if (this._exists()) {
                if (!this._validateContent()) {
                    this.content = await this._collect()
                    if (!this.content) return {
                        invalid: true
                    }

                    if (this._validateContent()) {
                        if (this._parseContent()) {
                            return this.content
                        } else this.content = false
                    }
                }
            } else {
                this.content = await this._collect()
                if (!this.content) return {
                    invalid: true
                }
                if (this._validateContent()) {
                    if (this._parseContent()) {
                        return this.content
                    } else this.content = false
                }
            }
            if (this.retries !== "Infinite" && this.retries > retries) return {
                invalid: true
            }
            retries++
        }
        console.log(this.content)
        return this.content
    }

    _exists() {
        return !this.content || this.content.replace(/s*/g, "").length > 0
    }

    _parseContent() {
        return Parse[this.type] ? Parse[this.type](this.content, this.message, this.dm) : this.content
    }

    _validateContent() {
        return Validate[this.type](this.content, this.options)
    }

    async _collect() {
        this.message.channel.send(this._formatPrompt())
        let collected = await this.message.channel.awaitMessages(m => m.author.id === this.message.author.id, {
            max: 1,
            time: 30000,
            errors: ["time"]
        })
        if (typeof collected !== "string") collected = false
        return collected
    }

    _formatPrompt() {
        return `${this.message.author}, ${this.prompt}\n${this.type === "selection" ? this.options.opts.join(", ") : ""}\nRespond with \`cancel\` to cancel the command, it will automatically cancel in 30 seconds.`
    }

    _validateType() {
        if (this.type === undefined) throw new TypeError("Type Undefined")
        let typeSetup = {
            string() {
                this.options.max || (this.options.max = def.maxStringLength)
            },
            word() {
                this.options.max || (this.options.max = def.maxStringLength)
            },
            number() {
                this.options.max || (this.options.max = def.maxNumber)
                this.options.min || (this.options.min = def.minNumber)
            },
            duration() {
                this.options.max || (this.options.max = def.maxDuration)
                this.options.min || (this.options.min = def.minDuration)
            },
            selection() {
                this.options.ignoreCase || (this.options.ignoreCase = false)
                if (!this.options.opts) throw new Error("Missing opts option on selection type")
            },
            custom() {
                if (!this.options.regex) throw new TypeError("Missing regex option on custom type")
            }
        }
        if (!this.prompt) throw new Error("Argument missing prompt")
        if (!Validate[this.type]) throw new TypeError("Invalid type " + this.type)
    }
}