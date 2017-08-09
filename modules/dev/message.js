const Nitro = require("../../Nitro.js")
const bot = require("./bot.js")
const {
    FUNNBOT
} = require("../../config.js")
bot.ArgumentHandler = new Nitro.ArgumentHandler()

const commandhandler = new Nitro.CommandLoader("dev")
const commands = commandhandler.fetch()

bot.on("message", async message => {

    if (message.author.id !== FUNNBOT) return
    message.SetupExtension()
    if (!message.content.startsWith(message.prefix)) return

    commands[message.command] ? await commands[message.command].run(message, bot, message.send) : 0

})

process.stdin.on("data", async(str) => {
    str = str.toString().replace(/\n$/, "")
    let args = str.split(" ")
    let message = {}
    message.command = args[0]
    message.prefix = "n!"
    message.cutPrefix = str
    message.args = args.slice(1)
    message.suffix = message.args.join(" ")
    message.checkSuffix = message.suffix.length > 0
    message.send = (msg) => {
        msg = msg.replace(/```(js|prolog)\n[^`]+```/g, (txt) => {
            txt = txt.slice(3).slice(0, -3)
            if (txt.slice(0, 2) === "js") {
                txt = txt.slice(2)
            } else {
                txt = txt.slice(6)
            }
            return txt
        })
        msg = msg.replace(/\*\*(Input|Output|Error):\*\*/g, (txt) => {
            txt = txt.slice(2).slice(0, -2)
            return txt
        })
        msg = msg.replace(/(:outbox_tray:|:inbox_tray:)\s/g, "")
        bot.logger.info(msg)
    }
    message.author = {
        id: "163735744995655680",
        username: "Funnbot",
        discriminator: "4695",
        bot: false
    }
    commands[message.command] ? await commands[message.command].run(message, bot, message.send) : 0
})