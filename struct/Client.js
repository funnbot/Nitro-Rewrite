const Discord = require("discord.js")
const DatabaseManager = require("./DatabaseManager.js")
const Status = require("./Status.js")
const ClientExtension = require("../extensions/ClientExtension.js")
const MessageExtension = require("../extensions/MessageExtension.js")
const MessageEmbedExtension = require("../extensions/MessageEmbedExtension.js")
const ChannelExtension = require("../extensions/ChannelExtension.js")
const UserExtension = require("../extensions/UserExtension.js")
const GuildExtension = require("../extensions/GuildExtension.js")
const Sentry = require("raven")

ClientExtension.extend(Discord.Client)
MessageExtension.extend(Discord.Message)
MessageEmbedExtension.extend(Discord.MessageEmbed)
ChannelExtension.extend(Discord.Channel)
UserExtension.extend(Discord.User)
GuildExtension.extend(Discord.Guild)

require("../extensions/NativeExtensions.js")

class Client {
  constructor (key, opt = {}) {
    opt.disabledEvents = ["TYPING_START"]
    this.bot = new Discord.Client(opt)
    this.bot.embed = Discord.MessageEmbed
    this.bot.module = key

    Sentry.config(this.bot.config.auth.SENTRY).install()
    this.bot.sentry = Sentry

    this.bot.active = {
      channel: {},
      guild: {},
      user: {}
    }

    this.bot.on("ready", () => {
      console.log(`${key} bot online`)
      Status.start(this.bot)
    })

    process.on("unhandledRejection", (err) => this.bot.logger.error(err.stack))
  }

  ready (cb) {
    this.bot.once("ready", () => cb())
  }

  database (keys = []) {
    keys.push("prefix", "alias", "perms")
    for (let db of keys) {
      this.bot[db] = new DatabaseManager(db)
    }
  }

  login () {
    this.bot.login(this.bot.config.auth.TOKEN).catch(console.log)
  }
}

module.exports = Client
