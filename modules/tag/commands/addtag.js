module.exports = new Nitro.Command({

  help: "Add a tag",
  example: "",
  args: "",
  dm: false,
  coolDown: 1,
  userPerms: [],
  botPerms: [],

  run: async(message, bot, send) => {

    let tags = bot.tag.get(message.guild.id)

    

  }

})
