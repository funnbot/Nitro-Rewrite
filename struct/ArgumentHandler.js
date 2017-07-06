class ArgumentHandler {
  constructor(message) {
    this.message = message
    this.channel = message.channel
  }
  async run(args) {
    if (1 > args.length) return resolve(this.message.content)
    for (let [i, a] of args.entries()) {
      let content = this.message.args[i]
      if (!content) {
        let collect = await this.collect(a)


      }
    }
  }
  collect(arg) {

    return new Promise((resolve, reject) => {

      let collector = this.channel.createCollector(m => m.author.id === this.message.author.id, {
        time: 30000
      })
      collector.on("collect", msg => {
        if (msg.content === "cancel") collector.stop("cancel")
        if (arg.type.number) {
          let num = parseInt(msg.content) || "invalid"
          if (num === "invalid") collector.stop("invalid")
          if (arg.type.number.max !== "none" && num > arg.type.number.max) collector.stop("invalid")
          if (arg.type.number.min !== "none" && num < arg.type.number.min) collector.stop("invalid")
          return msg.content
        } else if (arg.type.name) {
          if (msg.content.length > 100) collector.stop("invalid")
          if (msg.content.replace(/\s+/g, "").length < 1) collector.stop("invalid")
          msg.content = msg.content.replace(/\s/g, "-")
          return msg.content
        } else if (arg.type.text) {
          if (msg.content.length > 2000) collector.stop("invalid")
          if (msg.content.replace(/\s+/g, "").length < 1) collector.stop("invalid")
          return msg.content.trim()
        }
      })
      collector.on("end", (c, reason) => {
        if (reason === "time" || reason === "cancel") {
          this.message.reply("Command cancelled")
          return
        }


      })
      this.message.reply(`${arg.desc}\n\nRespond with \`cancel\` to cancel the commmand, it will automatically cancel in 30 seconds.`)

    })
  }
}
Nitro.ArgumentHandler = ArgumentHandler
