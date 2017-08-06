const CommandLoader = require("./CommandLoader.js")
const Alias = require("./Alias.js")
const CoolDown = require("./CoolDown.js")
const ArgumentHandler = require("./ArgumentHandler.js")
const PermissionHandler = require("./PermissionHandler.js")
const EventEmitter = require("events")

class Message extends EventEmitter {
  constructor(bot, options = {}) {
    super()
    this.bot = bot
    this.options = options
    // This converts arrays to {string: true...}
    this.dis = options.disable ? options.disable.reduce((o, d) => {
      o[d] = true
      return o
    }, {}) : {}
    this.enabledEvents = options.events ? options.events.reduce((o, d) => {
      o[d] = true
      return o
    }, {}) : {}

    if (!this.dis.commands) {
      this.CommandHandler = new CommandLoader(bot.module)
      this.commands = this.CommandHandler.fetch()
    }
    if (this.options.fetchAllCommands) {
      if (!this.CommandHandler) this.CommandHandler = new CommandLoader(bot.module)
      this.CommandHandler.readAll()
      bot.allCommands = this.CommandHandler.fetchAll()
    }
    if (!this.dis.alias && this.commands) {
      this.alias = new Alias(bot.module, this.commands)
      this.alias.mapDefaults(this.commands)
    }
    if (!this.dis.cooldown) {
      this.cooldown = new CoolDown()
    }
    bot.ArgumentHandler = new ArgumentHandler()
    if (!this.dis.permissions) {
      this.permissions = new PermissionHandler()
    }
    if (!this.dis.create) {
      bot.on("message", message => {
        if (message.author.bot) return
        message.SetupExtension()
        this.emit("create", message)
        if (!this.dis.prefix && !message.content.startsWith(message.prefix)) return
        if (this.dis.text && message.channel.type === "text") return
        if (this.dis.dm && message.channel.type !== "text") return
        if (!this.dis.execute) {
          if (!this.commands) return `Commands are disabled but execute is running: ${bot.module} module`.log()
          if (!this.dis.alias) {
            this.alias.mapCustom(bot.alias.g(message.guild))
            message.command = this.alias.run(message)
          }
          let command = this.commands[message.command]
          if (!command) return
          if (!this.dis.permissions && message.guild && this.permissions.user(message, bot, command.perm)) return
          if (message.channel.type !== "text" && !command.dm) return
          if (!this.dis.noPermAlert && message.channel.type === "text" && !message.channel.permissionsFor(bot.user).has("SEND_MESSAGES"))
            return message.author.send("**I lack permission to send messages in this channel.**")
          if (this.cooldown && this.cooldown.run(message, command)) return 
          command.run(message, bot, message.send)
        }
      })
    }

    if (this.enabledEvents.edit) {
      bot.on("messageUpdate", (oldMessage, newMessage) => {
        this.emit("edit", oldMessage, newMessage)
      })
    }

    if (this.enabledEvents.delete) {
      bot.on("messageDelete", message => {
        this.emit("delete", message)
      })
    }
  }
}

module.exports = Message