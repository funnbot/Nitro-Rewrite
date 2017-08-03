class Message {
  constructor(bot, options = []) {
    this.options = options
    this.bot = bot
    if (this.c("commands")) {
      this.CommandHandler = new Nitro.CommandHandler(bot.module)
      this.commands = this.CommandHandler.fetch()
    }
    if (this.c("allCommands") || this.c("allcommands")) {
      if (!this.CommandHandler) this.CommandHandler = new Nitro.CommandHandler(bot.module)
      this.CommandHandler.readAll()
      bot.allCommands = this.CommandHandler.fetchAll()
    }
    if (this.c("alias") && this.c("commands")) {
      this.alias = new Nitro.Alias(bot.module, this.commands)
    }
    if (this.c("cooldown")) {
      this.cooldown = new Nitro.CoolDown()
    }
    if (this.c("argumenthandler")) {
      this.ArgumentHandler = new Nitro.ArgumentHandler()
    }
    if (this.c("permissions")) {
      this.perms = new Nitro.PermissionHandler()
    }

  }

  on(cb) {
    this.bot.on("message", message => {
      cb ? cb(message) : 0
      if (message.author.bot) return
      if (!this.c("noprefix") && !message.content.startsWith(message.prefix)) return
      if (this.c("text") && message.channel.type !== "text") return
      if (this.c("dm") && message.channel.type !== "dm") return
      if (this.c("alias") && this.c("commands")) {
        this.alias.mapCustom(this.bot.alias.g(message.guild ? message.guild.id : "1234"))
        message.content = this.alias.run(message)
      }

      let command
      if (this.c("commands")) command = this.commands[message.command]
      if (this.c("permissions") && message.guild && this.c("commands") && command && this.perms.user(message, this.bot, command.perm)) return
      if (this.c("argumenthandler")) this.bot.ArgumentHandler = this.ArgumentHandler
      if (this.c("execute") && !this.c("nosendperm") && message.channel.type === "text" && !message.channel.permissionsFor(this.bot.user).has("SEND_MESSAGES")) return send("**I lack permission to send messages in this channel**")
      if (this.c("execute") && command) command.run(message, this.bot, message.send)
    })
  }

  c(c) {
    return this.options.includes(c)
  }


}

Nitro.Message = Message