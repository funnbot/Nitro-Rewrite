class Command {

  constructor(options) {

    this.help = options.help || "The help message is missing"
    this.help.endsWith(".") ? 0 : this.help += "."

    this.example = options.example || options.usage || "There is no example."

    this.args = options.args || options.params || ""


    this.dm = options.dm || !options.guildOnly || false

    this.coolDown = options.coolDown || options.cooldown || 1


    this.userPerms = options.userPerms || options.userperms || []

    this.botPerms = options.botPerms || options.botperms || []

    this.roles = []

    this.runCommand = options.run
    if (!this.runCommand) throw new Error("Command function undefined")

  }

  async run(bot, message, send) {

    if (typeof this.runCommand === "string") send(this.runCommand).catch(console.log)
    else if (typeof this.runCommand === "function") {
      try {
        await this.runCommand(message, bot, send)
      } catch (err) {
        send("Command Error, Please alert the developer.").catch(console.log)
        console.log(message.command + " - " + err)
      }
    } else throw new Error("Invalid command type")

  }

}

Nitro.Command = Command
