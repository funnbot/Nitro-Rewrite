class Command {

  constructor(options) {

    this.help = options.help || "The help message is missing"
    this.help += this.help.endsWith(".") ? "" : "."
    this.example = options.example || options.usage || "There is no example."
    this.argExample = options.argExample || options.paramExample || ""

    this.dm = options.dm || false
    this.coolDown = options.coolDown || options.cooldown || 1
    this.args = options.args || options.argumentHandler || []

    this.perm = options.userPerms || options.perm || 4
    this.botPerms = options.botPerms || options.botperms || []

    this.alias = options.alias || []

    this.runCommand = options.run
    if (!this.runCommand) throw new Error("Command function undefined")

  }

  async run(message, bot, send) {
    if (typeof this.runCommand === "string") send(this.runCommand).catch(console.log)
    else if (typeof this.runCommand === "function") {
      if (bot.ArgumentHandler.chActive(message)) return
      try {
        message.content = await bot.ArgumentHandler.run(this.args, message)
        if (!message.content) return
        message.channel.startTyping()
        setTimeout(() => {
          message.channel.stopTyping()
        }, 2500)

        await this.runCommand(message, bot, send)
      } catch (err) {
        send("Command Error, Please alert the developer.").catch(console.log)
        bot.logger.error(message.command + " - " + err.stack)
      }
    } else throw new Error("Invalid command type")

  }

}

Nitro.Command = Command
