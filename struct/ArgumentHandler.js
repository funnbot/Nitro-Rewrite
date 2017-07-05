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



      })

      this.channel.send(`${arg.desc}\n\nRespond with \`cancel\` to cancel the commmand, it will automatically cancel in 30 seconds.`)

    })

  }

}

Nitro.ArgumentHandler = ArgumentHandler
