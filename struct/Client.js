const Discord = require("discord.js")
const DatabaseManager = require("./DatabaseManager.js")
const MessageExtension = require("../extensions/MessageExtension.js")

MessageExtension.extend(Discord.Message)

const { TOKEN } = require("../config.js")

global.Nitro = {}

require("./Command.js")
require("./CommandLoader.js")
require("./CoolDown.js")
require("./PermissionCheck.js")

class Client {

  constructor(key, opt = {}) {

    opt.disabledEvents = ["TYPING_START"]
    this.bot = new Discord.Client(opt)
    this.bot.embed = Discord.RichEmbed

    this.bot.on("ready", () => console.log(`${key} bot online`))

  }

  database(keys = []) {
    keys.push("prefix")
    for (let db of keys) {
      this.bot[db] = new DatabaseManager(db)
    }
  }

  login() {
    this.bot.login(TOKEN).catch(console.log)
  }
}

module.exports = Client
