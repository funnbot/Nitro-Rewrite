module.exports = new Nitro.Command({
  help: "A more customizable poll.",
  example: "${p}adminpoll #announcements #voting",
  argExample: "<the channel the poll is sent to> <the channel people vote from> <DD:MM:SS> <question> | <optionOne> | <optionTwo> | ...",
  dm: false,
  coolDown: 60,
  userPerms: ["MANAGE_GUILD"],
  alias: ["apoll"],
  args: [
    {
      desc: "What channel should it be displayed in?",
      type: "channel"
    },
    {
      desc: "What channel should users vote from?",
      type: "channel"
    },
    {
      desc: "How long will it last?",
      type: "name"
    },
    {
      desc: "What are the options?\nSeparate with the character: `|`\nEx. `What is the best bot? | Nitro | Mee6 | Funnbot`",
      type: "text"
    }
  ],

  run: async (message, bot, send) => {

  }
})
