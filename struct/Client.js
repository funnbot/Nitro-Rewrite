const Discord = require('discord.js')
const MessageExtension = require('../extensions/MessageExtension.js')

MessageExtension.extend(Discord.Message)

const { TOKEN } = require('../config.js')

class Client {

    constructor(key, opt = {}) {

        this.options = opt
        this.options.disabledEvents = ["TYPING_START"]
        this.bot = new Discord.Client(this.options)
        this.bot.embed = Discord.RichEmbed

        this.bot.on('ready', () => console.log(`${key} bot online`))

    }
    
    login() {
        this.bot.login(TOKEN)
    }
}

module.exports = Client