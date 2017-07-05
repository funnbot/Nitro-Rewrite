module.exports = new Nitro.Command({

  help: "Create a tag",
  example: "",
  args: "<name> <content>",
  dm: false,
  coolDown: 1,
  userPerms: [],
  botPerms: [],

  argh: [
    {
      desc: "What would you like to name it?",
      type: "text"
    },
    {
      desc: "What content should it have?",
      type: "text"
    }
  ],

  run: async(message, bot, send) => {

    if (!message.checkSuffix) return send()

    let tags = bot.tag.get(message.guild.id)



  }

})
