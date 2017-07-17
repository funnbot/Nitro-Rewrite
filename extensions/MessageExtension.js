const Extension = require("./Extension")

class MessageExtension extends Extension {

  get prefix() {
    return this.client.prefix.g(this.guild ? this.guild.id : "1234")
  }

  get cutPrefix() {
    return this.content.slice(this.prefix.length)
  }

  get command() {
    return this.cutPrefix.split(" ")[0]
  }

  get args() {
    return this.cutPrefix.split(" ").slice(1).filter(t => t != "")
  }

  get suffix() {
    return this.cutPrefix.split(" ").slice(1).join(" ").trim()
  }

  suffixOf(index) {
    return this.cutPrefix.split(" ").slice(index + 1).join(" ")
  }

  get checkSuffix() {
    return this.suffix.replace(/\s/g, "").length > 0
  }

  get send() {
    return this.channel.send.bind(this.channel)
  }

}

module.exports = MessageExtension
