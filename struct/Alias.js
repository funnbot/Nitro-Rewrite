class Alias {

  constructor(key, commands) {
    this.key = key
    this.aliases = {}
    this.mapDefaults(commands)
  }

  mapDefaults(commands) {
    Object.keys(commands).forEach(c => {
      commands[c].alias.forEach(a => {
        this.aliases[a] = c
      })
    })
  }

  mapCustom(custom) {
    Object.keys(custom).forEach(c => {
      this.aliases[c] = custom[c]
    })
  }

  run(message) {
    if (!this.aliases[message.command]) return message.content
    return message.prefix + this.aliases[message.command] + " " + message.suffix
  }

}

Nitro.Alias = Alias