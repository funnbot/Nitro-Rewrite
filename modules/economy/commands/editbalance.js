const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
  help: "Edit a user's balance.",
  example: "${p}editbalance Funnbot add 4000 || ${p}editbalance Funnbot set 1200 || ${p}editbalance Funnbot remove 300",
  argExample: "<user> <method> <amount>",
  userPerms: 2,
  botPerms: [],
  alias: ["editbal", "editmoney"],
  args: [],

  run: async (message, bot, send) => {
    
  }
})