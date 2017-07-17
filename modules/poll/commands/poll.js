const Duration = require("duration-js")

module.exports = new Nitro.Command({
  help: "The old poll command.",
  example: "${p}poll 10m What is the best bot? | Nitro | Mee6 | Funnbot",
  argExample: "<time> <question> | <option1> | <option2> | ...",
  dm: false,
  coolDown: 10,
  userPerms: [],

  args: [
    {
      desc: "How long will it run?",
      type: "name"
    },
    {
      desc: "What is the question and options?\nSeparate with the character: `|`\nEx. `What is the best bot? | Nitro | Mee6 | Funnbot`",
      type: "text"
    }],

  run: async (message, bot, send) => {

    if (message.channel.check("poll")) return send("You have already active")
    message.channel.add("poll")

    message.channel.del("poll")


  }
})
