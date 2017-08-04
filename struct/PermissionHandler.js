const {PERMISSIONS, FUNNBOT} = require("../config.js")

class PermissionHandler {
  user (message, bot, perm = 4) {
    if (!message.guild) {
      if (perm === 4 && message.author.id === FUNNBOT) return false
      else if (perm !== 4) return false
      return true
    }
    if (perm !== 4 && message.author.id === message.guild.ownerID) return false
    let perms = [
      "User",
      "Moderator",
      "Admin",
      "Nitro Commander",
      "Dev"
    ]
    let has = {
      user: message.member.roles.find("name", perms[0]),
      mod: message.member.roles.find("name", perms[1]),
      admin: message.member.roles.find("name", perms[2]),
      nitro: message.member.roles.find("name", perms[3])
    }
    if (perm === 0) {
      let userRole = bot.perms.g(message.guild ? message.guild.id : "1234")
      if (userRole) {
        if (has.user) return false
        else {
          message.channel.send("**This command requires you to have a role named `" + perms[perm] + "`**")
          return true
        }
      } else {
        message.channel.send("**This command requires you to have a role named `" + perms[perm] + "`**")
        return false
      }
    }
    if (perm === 4 && message.author.id === FUNNBOT) return false

    if (perm === 3 && has.nitro) return false
    if (perm === 2 && (has.admin || has.nitro)) return false
    if (perm === 1 && (has.mod || has.admin || has.nitro)) return false
    message.channel.send("**This command requires you to have a role named `" + perms[perm] + "`**")
    return true
  }

  bot (message, bot, perms = []) {
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
}

Nitro.PermissionHandler = PermissionHandler
