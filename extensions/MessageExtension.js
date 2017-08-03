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

  succ(text, data) {
    this.channel.send(`:white_check_mark: **| ${text.replace(/\*\*/g, "")}** ${data || ""}`)
  }

  warn(text, data) {
    this.channel.send(`:warning: **| ${text.replace(/\*\*/g, "")}** ${data || ""}`)
  }

  fail(text, data) {
    this.channel.send(`:no_entry_sign: **| ${text.replace(/\*\*/g, "")}** ${data || ""}`)
  }

  async collectMessage(truthy, falsy, filter, time) {
    return new Promise((resolve, reject) => {
      if (filter === "author") filter = m => m.author.id === this.author.id
      else if (filter === "everyone") filter = m => m.user.bot === "false"
      else return reject("Filter = author || everyone")
      if (!time) time = 30000
      let collector = this.channel.createMessageCollector(filter, {time})
      collector.on("collect", msg => {
        if ((typeof truthy === "object" && truthy.includes(msg.content)) || (truthy === msg.content)) return collector.stop("true")
        if ((typeof falsy === "object" && falsy.includes(msg.content)) || (falsy === msg.content)) return collector.stop("false")
      })
      collector.on("end", (c, reason) => {
        resolve({time: false, true: true, false: false}[reason])
      })
    })
  }

  async parseUser(u) {
    if (/<@\d{17,19}>/.test(u) || /<@!\d{18,21}>/.test(u)) {
      let id = u.replace(/[^1234567890]/g, "")
      try {
        let member = await this.guild.fetchMember(id)
        return member
      } catch(err) {
        return null
      }
    }
    if (/\d{17,19}/.test(u)) {
      let id = u.replace(/[^1234567890]/g, "")
      try {
        let member = await this.guild.fetchMember(id)
        return member
      } catch(err) {
        return null
      }
    }
    if (/^.{2,32}#\d{4}$/.test(u)) {
      let [name, disc] = u.split("#")
      try {
        await this.guild.fetchMembers()
        return this.guild.members.find(m => m.user.username.toLowerCase() === name.toLowerCase() && m.user.discriminator === disc)
      } catch (err) {
        return null
      }
    }
    if (/^.{2,32}$/.test(u)) {
      if (u.length < 2) return null
      try {
        await this.guild.fetchMembers()
        return this.guild.members.find(m => m.user.username.toLowerCase().includes(u.toLowerCase()) || (m.nickname && m.nickname.toLowerCase().includes(u.toLowerCase())))
      } catch (err) {
        return null
      }
    }
    return null
  }

  async parseRole(u) {
    return null
  }

  async parseChannel(u) {
    if (/<#\d{17,19}>/.test(u)) {
      let id = u.replace(/[^1234567890]/g, "")
      return this.guild.channels.get(id) || false
    }
    if (/\d{17,19}/.test(u)) {
      let id = u.replace(/[^1234567890]/g, "")
      return this.guild.channels.get(id) || false
    }
    if (/^[a-z\-_]{2,100}$/.test(u)) {
      return this.guild.channels.find(c => c.name.toLowerCase().includes(u.toLowerCase()))
    }
    return null
  }

}

module.exports = MessageExtension
