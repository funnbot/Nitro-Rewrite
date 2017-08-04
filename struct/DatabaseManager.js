const r = require("rethinkdbdash")({
  db: "Nitro"
})
const {DEFAULTS} = require("../config.js")

class DatabaseManager {
  constructor (key) {
    this.key = key
    this.settings = {}
    r.table(key).run().then(res => {
      res.forEach(k => {
        this.settings[k.id] = k.data
      })
    }).catch(() => r.tableCreate(key).run().then().catch())
    r.table(key).changes().run().then(feed => {
      feed.each((err, row) => {
        if (err) return console.log(err)
        if (!row.new_val) return
        this.settings[row.new_val.id] = row.new_val.data
      })
    })
  }

  update (id) {
    r.table(this.key).insert({
      id,
      data: this.settings[id]
    }, {
      conflict: "replace"
    }).run()
  }

  g (id) {
    if (id.guild && id.guild.id) id = id.guild.id
    if (id.id) id = id.id
    if (!id) id = "1234"
    return this.settings[id] ? this.settings[id] : DEFAULTS[this.key]
  }

  s (id, val) {
    if (id.guild && id.guild.id) id = id.guild.id
    if (id.id) id = id.id
    if (!id) id = "1234"
    this.settings[id] = val
    this.update(id)
  }

  gKey (id, key) {
    if (id.guild && id.guild.id) id = id.guild.id
    if (id.id) id = id.id
    if (!id) id = "1234"
    if (!this.settings[id] || !this.settings[id][key]) return false
    return this.settings[id][key]
  }

  sKey (id, key, val) {
    if (id.guild && id.guild.id) id = id.guild.id
    if (id.id) id = id.id
    if (!id) id = "1234"
    if (!this.settings[id]) this.settings[id] = {}
    this.settings[id][key] = val
    this.update(id)
  }
}

module.exports = DatabaseManager
