class ArgumentHandler {
  constructor(m) {
    this.message = m
  }

  async run(args) {
    if (1 > args.length) return this.message.content
    let newContent = []
    newContent.push(this.message.prefix + this.message.command)
    for (let [i, a] of args.entries()) {
      let content = this.message.args[i]
      let collect
      if (!content) {
        collect = await this.collect(a)
        if (!collect) return false
      }
      newContent.push(i + 1 === args.length ? this.message.suffixOf(i).length > 0 ? this.message.suffixOf(i) : collect : this.message.args[i] || collect)
    }
    return newContent.join(" ")
  }

  collect(arg) {

    return new Promise((resolve) => {

      let collector = this.message.channel.createMessageCollector(m => m.author.id === this.message.author.id, {
        time: 30000
      })

      collector.on("collect", msg => {
        if (msg.content === "cancel") return collector.stop("cancel")
        if (arg.type.number) {
          let num = parseInt(msg.content) || "invalid"
          if (num === "invalid") return collector.stop("invalid")
          if (arg.type.number.max !== "none" && num > arg.type.number.max) return collector.stop("invalid")
          if (arg.type.number.min !== "none" && num < arg.type.number.min) return collector.stop("invalid")
          collector.stop("valid")
          return resolve(msg.content)
        } else if (arg.type === "name") {
          if (msg.content.length > 100) return collector.stop("invalid")
          if (msg.content.replace(/\s+/g, "").length < 1) return collector.stop("invalid")
          msg.content = msg.content.replace(/\s/g, "-")
          collector.stop("valid")
          return resolve(msg.content)
        } else if (arg.type === "text") {
          if (msg.content.length > 2000) return collector.stop("invalid")
          if (msg.content.replace(/\s+/g, "").length < 1) return collector.stop("invalid")
          collector.stop("valid")
          return resolve(msg.content)
        }
      })

      collector.on("end", (c, reason) => {
        if (reason === "time" || reason === "cancel") {
          this.message.reply("Command cancelled")
          return resolve(false)
        }
        if (reason === "invalid") {
          return this.collect(arg)
        }
      })

      this.message.reply(`${arg.desc}\n\nRespond with \`cancel\` to cancel the command, it will automatically cancel in 30 seconds.`)

    })
  }
}
Nitro.ArgumentHandler = ArgumentHandler
