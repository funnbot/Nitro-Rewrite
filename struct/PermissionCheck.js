const {PERMISSIONS} = require("../config.js")

let user = (message, perms = []) => {

  let not = []

  perms.forEach(p => {

    if (!message.channel.permissionsFor(message.member).has(p)) {

      not.push(p)

    }

  })

  if (not.length > 0) {
    let s = not.length > 1 ? "s" : ""
    not = not.map(p => PERMISSIONS[p])
    message.send("You lack the permission" + s + ": `" + not.join("`, `") + "`")
    return true
  } else return false

}

let bot = () => {

}

Nitro.PermissionCheck = { user, bot }
