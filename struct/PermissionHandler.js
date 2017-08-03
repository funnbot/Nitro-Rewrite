const {PERMISSIONS, FUNNBOT} = require('../config.js')

class PermissionHandler {
  constructor () {
  }

  user (message, bot, perm = 4) {
    if (!message.guild) {
      if (perm === 4 && message.author.id === FUNNBOT) return false
      else if (perm !== 4) return false
      return true
    }
    if (perm !== 4 && message.author.id === message.guild.ownerID) return false
    let perms = [
      'User',
      'Moderator',
      'Admin',
      'Nitro Commander',
      'Dev'
    ]
    let has = {
      user: message.member.roles.find('name', perms[0]),
      mod: message.member.roles.find('name', perms[1]),
      admin: message.member.roles.find('name', perms[2]),
      nitro: message.member.roles.find('name', perms[3])
    }
    if (perm === 0) {
      let userrole = bot.perms.g(message.guild ? message.guild.id : '1234')
      if (userrole) {
        return (!message.member.roles.find('name', perms[perm]))
      } else return false
    }
    if (perm === 4 && message.author.id !== FUNNBOT) return true
    return (!message.member.roles.find('name', perms[perm]))
  }

  bot (message, bot, perms = []) {
    let not = []
    perms.forEach(p => {
      if (!message.channel.permissionsFor(bot.user).has(p)) {
        not.push(p)
      }
    })

    if (not.length > 0) {
      let s = not.length > 1 ? 's' : ''
      not = not.map(p => PERMISSIONS[p])
      message.send('I (Nitro) lack the permission' + s + ': `' + not.join('`, `') + '`')
      return true
    } else return false
  }

}

Nitro.PermissionHandler = PermissionHandler
