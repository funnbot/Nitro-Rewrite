const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
  help: "Edit a user's balance.",
  example: "${p}editbalance Funnbot add 4000 || ${p}editbalance Funnbot set 1200 || ${p}editbalance Funnbot remove 300",
  argExample: "<user> <method> <amount>",
  userPerms: 2,
  alias: ["editbal", "editmoney"],

  run: async(message, bot, send) => {
    let member = message.args[0] ? await message.parseMember(message.args[0]) : message.member
    if (!member) return message.fail("Unable to get user from:", message.args[0])
    let id = member.user.id
    let bal = bot.moneyman.getMoney(message.guild, id)
  }
})