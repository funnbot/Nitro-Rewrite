const Extension = require("./Extension.js")

class GuildExtension extends Extension {

  add(key, value) {
    if (!this.client.active.guild[key]) this.client.active.guild[key] = {}
    this.client.active.guild[key][this.id] = value || true
  }

  check(key) {
    if (!this.client.active.guild[key]) this.client.active.guild[key] = {}
    return this.client.active.guild[key][this.id] || null
  }

  del(key) {
    if (!this.client.active.guild[key]) this.client.active.guild[key] = {}
    return delete this.client.active.guild[key][this.id]
  }

  purge(key) {
    return delete this.client.active.guild[key]
  }

}

module.exports = GuildExtension