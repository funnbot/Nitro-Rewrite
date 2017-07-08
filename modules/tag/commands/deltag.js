module.exports = new Nitro.Command({

  help: "Delete a tag",
  example: "${p}deltag nitro",
  argExample: "<name>",
  dm: false,
  coolDown: 1,
  userPerms: [],
  botPerms: [],

  args: [{
    desc: "Which tag would you like to delete?",
    type: "name"
  }],

  run: async (message, bot, send) => {

    let tags = bot.tag.get(message.guild.id)

  }
})
