module.exports = new Nitro.Command({
  help: "A list of commands.",
  example: "${p}help",
  argExample: "",
  dm: true,
  coolDown: 1,
  userPerms: 0,
  botPerms: [],

  args: [],

  run: async (message, bot, send) => {
    let modules = {
      config: [
        "Configuration",
        "Change basic configuration for Nitro."
      ],
      mod: [
        "Moderation",
        "Manage users who are acting up."
      ],
      poll: [
        "Polls",
        "Create custom polls for users to vote on."
      ],
      tag: [
        "Tags",
        "Store custom text and make it easy to access."
      ],
    }
    let commands = bot.allCommands
    let fields = []
    for (let [key, val] of Object.entries(modules)) {
      let value = Object.entries(commands[key]).map(([k, c]) => `• ${message.prefix}${k} - ${c.help}`).join("\n")
      fields.push({name: `${val[0]} - ${val[1]}`, value})
    }
    let embed = new bot.embed()
    embed.fields = fields
    embed.setColor("#36393e")
    send("", {embed})
  }
})
