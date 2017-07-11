const Discord = require("discord.js")
const DatabaseManager = require("./DatabaseManager.js")
const MessageExtension = require("../extensions/MessageExtension.js")
const MessageEmbedExtension = require("../extensions/MessageEmbedExtension.js")
const Sentry = require("raven")

MessageExtension.extend(Discord.Message)
MessageEmbedExtension.extend(Discord.MessageEmbed)

const { TOKEN, SENTRY } = require("../config.js")

global.Nitro = {}

require("./Command.js")
require("./CommandLoader.js")
require("./CoolDown.js")
require("./PermissionCheck.js")
require("./ArgumentHandler")
require("./Logger.js")
require("./util.js")
require("./Alias.js")

class Client {

  constructor(key, opt = {}) {

    opt.disabledEvents = ["TYPING_START"]
    this.bot = new Discord.Client(opt)
    this.bot.embed = Discord.MessageEmbed

    Sentry.config(SENTRY).install()
    this.bot.sentry = Sentry

    this.bot.on("ready", () => console.log(`${key} bot online`))

  }

  database(keys = []) {
    keys.push("prefix", "alias")
    for (let db of keys) {
      this.bot[db] = new DatabaseManager(db)
    }
  }

  login() {
    this.bot.login(TOKEN).catch(console.log)
  }
}

module.exports = Client
