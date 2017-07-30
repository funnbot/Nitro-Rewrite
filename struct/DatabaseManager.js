const r = require("rethinkdbdash")({
  db: "Nitro"
})
const {DEFAULTS} = require("../config.js")

class DatabaseManager {
  constructor(key) {
    this.key = key
    this.settings = {}
    r.table(key).run().then(res => {
      res.forEach(k => {
        this.settings[k.id] = k.data
      })
    })
    r.table(key).changes().run().then(feed => {
      feed.each((err, row) => {
        if (err) return console.log(err)
        if (!row.new_val) return
        this.settings[row.new_val.id] = row.new_val.data
      })
    })
  }

  update(id) {
    r.table(this.key).insert({
      id,
      data: this.settings[id]
    }, {
      conflict: "replace"
    }).run()
  }

  g(id) {
    return this.settings[id] ? this.settings[id] : DEFAULTS[this.key]
  }

  s(id, val) {
    this.settings[id] = val
    this.update(id)
  }
}

module.exports = DatabaseManager
