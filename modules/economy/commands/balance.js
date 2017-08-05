const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
  help: "How much USD you have.",
  example: "${p}money @Funnbot",
  argExample: "<user>",
  dm: false,
  coolDown: 4,
  userPerms: 0,
  alias: ["money", "bal"],

  run: async (message, bot, send) => {
      let member = message.args[0] ? await message.parseMember(message.args[0]) : message.member
      if (!member) return message.fail("Unable to get user from:", message.args[0])
      let id = member.user.id
      let bal = bot.moneyman.getMoney(message.guild, id)
      return send(`Your current balance is ${bot.config.CUR.sym}${bal} ${bot.config.CUR.icon}`.bold())
  }
})
