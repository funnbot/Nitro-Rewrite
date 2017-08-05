const Discord = require("discord.js")

let start = async (bot) => {
  let webhook = new Discord.WebhookClient("336196327975419906", "LfGQ70qrtgMQMfQYGNY2WrLWfNYzdRMAE6d7cEOB1cQ5PLJlJSPkFEGwHiHNzIOXsKps")
  if (bot.shard) {
    let text = `Shard: ${bot.shard.id + 1}/${bot.shard.count} - Module: ${bot.module || ""} - Bot: ${bot.user.tag} (${bot.user.id}) - `
    try {
      let app = await bot.fetchApplication()
      text += `Owner: ${app.owner.tag} (${app.owner.id})`
    } catch (err) {
      console.log(err)
      text += "Owner: Unknown"
    }
    return webhook.send(text)
  } else {
    let text = `Module: ${bot.module || ""} - Bot: ${bot.user.tag} (${bot.user.id}) - `
    try {
      let app = await bot.fetchApplication(bot.user)
      text += `Owner: ${app.owner.tag} (${app.owner.id})`
    } catch (err) {
      text += "Owner: Unknown"
    }
    return webhook.send(text)
  }
}

let crash = (bot) => {

}

module.exports = {start, crash}