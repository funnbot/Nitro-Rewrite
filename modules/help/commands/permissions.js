const Nitro = require("../../../Nitro.js")
module.exports = new Nitro.Command({
  help: "Tutorial on Nitro's permission system.",
  example: "${p}permissions",
  argExample: "",
  dm: true,
  coolDown: 1,
  userPerms: 0,
  botPerms: [],

  args: [],

  run: async (message, bot, send) => {
    console.log("?")
    let txt = `**Permissions**
    Nitro uses a simple 4 role permission system.
    The roles do not need any special permissions. It is the **name** of the role that matters.
    Roles work in a hierarchy, higher level roles have access to lower level commands.
    
    \`User\` - A Toggleable feature, if enabled, all server members **must** have the \`User\` role in order to use Nitro's commands. Toggle with the \`${message.prefix}requireuser\` command.
    \`Moderator\` - Gives access to all moderator commands such as ban and purge.
    \`Admin\` - Almost all server configuration commands such as prefix.
    \`Nitro Commander\` - Complete control of all commands and features.`.unindent()

    send(txt)
  }
})
