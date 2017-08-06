const Nitro = require("../../Nitro.js")
const CaseManager = require("./CaseManager.js")
const bot = require("./bot.js")

const Message = new Nitro.Message(bot, {
    disable: ["dm"]
})

Message.on("create", message => {
    if (message.channel.type === "text" && !message.guild.check("caseman")) message.guild.add("caseman", new CaseManager(bot, message.guild))
})