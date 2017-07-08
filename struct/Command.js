class Command {

  constructor(options) {

    this.help = options.help || "The help message is missing"
    this.help += this.help.endsWith(".") ? "" : "."
    this.example = options.example || options.usage || "There is no example."
    this.argExample = options.argExample || options.paramExample || ""

    this.dm = options.dm || options.guildOnly || false
    this.coolDown = options.coolDown || options.cooldown || 1
    this.args = options.args || options.argumentHandler || []

    this.userPerms = options.userPerms || options.userperms || []
    this.botPerms = options.botPerms || options.botperms || []

    this.permissions = []
    this.alias = []
    this.roles = []

    this.runCommand = options.run
    if (!this.runCommand) throw new Error("Command function undefined")

  }

  async run(message, bot, send) {

    if (typeof this.runCommand === "string") send(this.runCommand).catch(console.log)
    else if (typeof this.runCommand === "function") {
      const ArgumentHandler = new Nitro.ArgumentHandler(message)
      try {
        message.content = await ArgumentHandler.run(this.args)
        if (!message.content) return
        await this.runCommand(message, bot, send)
      } catch (err) {
        send("Command Error, Please alert the developer.").catch(console.log)
        console.log(message.command + " - " + err)
      }
    } else throw new Error("Invalid command type")

  }

}

Nitro.Command = Command
