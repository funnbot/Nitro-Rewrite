module.exports = new Nitro.Command({
  help: "How much USD you have.",
  example: "${p}money @Funnbot",
  argExample: "<user>",
  dm: false,
  coolDown: 4,
  userPerms: 0,
  alias: ["balance", "bal"],

  run: async (message, bot, send) => {

  }
})
