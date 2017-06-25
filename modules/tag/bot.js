const Discord = require('discord.js')

const message = require('./messageEvent.js')
const { TOKEN } = require('../../config.js')

const bot = new Discord.Client({
    disabledEvents: ['TYPING_START']
})

bot.on('message', message)

bot.login(TOKEN)