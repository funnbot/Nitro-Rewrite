const {PERMISSIONS} = require("../config.js")

class PermissionHandler {
  constructor() {
  }

  user(message, bot, perms = []) {
    let notP = []
    perms = this.mapPerms(message, bot, perms)
    perms.forEach(p => {
      if (!message.channel.permissionsFor(message.member).has(p)) {
        notP.push(p)
      }
    })
    let roles = this.mapRoles(message, bot)
    let notR = []
    roles.forEach(r => {
      if (!message.member) notR.push(r)
      if (!message.member.roles.has(r)) {
        notR.push(r)
      }
    })
    let fail = false
    if (notP.length > 0) {
      let s = notP.length > 1 ? "s" : ""
      notP = notP.map(p => PERMISSIONS[p])
      message.send("You lack the permission" + s + ": `" + notP.join("`, `") + "`")
      fail = true
    }

    if (notR.length > 0) {
      let s = notR.length > 1 ? "s" : ""
      notR = notR.map(p => {
        if (!message.guild) return p
        let role = message.guild.roles.get(p)
        if (!role) return p
        else return role.name
      })
      message.send("You lack the role" + s + ": `" + notR.join("`, `") + "`")
      fail = true
    }

    return fail
  }

  bot(message, bot, perms = []) {
    let not = []
    perms.forEach(p => {
      if (!message.channel.permissionsFor(bot.user).has(p)) {
        not.push(p)
      }
    })

    if (not.length > 0) {
      let s = not.length > 1 ? "s" : ""
      not = not.map(p => PERMISSIONS[p])
      message.send("I (Nitro) lack the permission" + s + ": `" + not.join("`, `") + "`")
      return true
    } else return false
  }

  mapPerms(message, bot, perms = []) {
    let custom = bot.perms.g(message.guild ? message.guild.id : "1234")
    custom.forEach(p => {
      if (perms[p]) delete perms[p]
      else perms.push(p)
    })
    return perms
  }

  mapRoles(message, bot) {
    return bot.roles.g(message.guild ? message.guild.id : "1234")
  }


}

Nitro.PermissionHandler = PermissionHandler
