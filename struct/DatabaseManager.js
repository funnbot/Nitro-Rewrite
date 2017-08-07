const r = require("rethinkdbdash")({
  db: "Nitro"
})
const {
  DEFAULTS
} = require("../config.js")

class DatabaseManager {
  constructor(key) {
    this.key = key
    this.settings = {}
    this.queue = []
    r.table(key).run().then(res => {
      res.forEach(k => {
        this.settings[k.id] = k.data
      })
    }).catch(console.log)
    r.table(key).changes().run().then(feed => {
      feed.each((err, row) => {
        if (err) return console.log(err)
        if (!row.new_val) return
        this.settings[row.new_val.id] = row.new_val.data
      })
    })

    let loop = (async() => {
      await this.insertQueue()
      setTimeout(() => loop(), 5e3)
    })()
  }

  async insertQueue() {
    try {
      await r.table(this.key).insert(this.queue, {
        conflict: "replace"
      }).run()
    } catch (err) {
      console.log(err)
    }
    return
  }

  update(id) {
    this.queue.push({
      id,
      data: this.settings[id]
    })
  }

  g(id) {
    if (id.guild && id.guild.id) id = id.guild.id
    if (id.id) id = id.id
    if (!id) id = "1234"
    return this.settings[id] ? this.settings[id] : DEFAULTS[this.key]
  }

  s(id, val) {
    if (id.guild && id.guild.id) id = id.guild.id
    if (id.id) id = id.id
    if (!id) id = "1234"
    this.settings[id] = val
    this.update(id)
  }

  gKey(id, key) {
    if (id.guild && id.guild.id) id = id.guild.id
    if (id.id) id = id.id
    if (!id) id = "1234"
    if (!this.settings[id] || !this.settings[id][key]) return {}
    return this.settings[id][key]
  }

  sKey(id, key, val) {
    if (id.guild && id.guild.id) id = id.guild.id
    if (id.id) id = id.id
    if (!id) id = "1234"
    if (!this.settings[id]) this.settings[id] = {}
    this.settings[id][key] = val
    this.update(id)
  }
}

module.exports = DatabaseManager