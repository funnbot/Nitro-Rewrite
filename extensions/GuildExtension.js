const Extension = require("./Extension.js")

class GuildExtension extends Extension {

  add(key) {
    if (!this.client.active[key]) this.client.active[key] = {}
    this.client.active[key][this.id] = true
  }

  check(key) {
    if (!this.client.active[key]) this.client.active[key] = {}
    return this.client.active[key][this.id]
  }

  del(key) {
    if (!this.client.active[key]) this.client.active[key] = {}
    delete this.client.active[key][this.id]
  }

}

module.exports = GuildExtension