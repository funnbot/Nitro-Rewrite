class CoolDown {

  constructor() {
    this.ids = {}
  }

  run(message, command) {
    let check = this.check(message.author.id, command.coolDown)
    if (check) {
      message.send("**CoolDown:** Please wait " + check / 1000 + " seconds before using this command.").then(m => m.delete({timeout: check}))
      return true
    }
    return false
  }

  check(id, cooldown) {
    let val = false
    let u = this.ids[id]
    let date = Date.now()
    if (u) {
      let e = u.date + u.cooldown * 1000
      e > date ? val = e - date : delete this.ids[id]
    } else {
      this.ids[id] = {date, cooldown}
    }
    return val
  }

}

module.exports = CoolDown
