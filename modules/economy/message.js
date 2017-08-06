const Nitro = require("../../Nitro.js")
const bot = require("./bot.js")

const Message = new Nitro.Message(bot)

Message.on("create", message => {
  let waiting = message.author.check("messagemoney")
  if (Date.now() - waiting > 2000) message.author.del("messagemoney")
  if (!message.author.check("messagemoney")) {
    message.author.add("messagemoney", Date.now())

    let am = (Math.floor(Math.random() * 3) + 1) / 100
    bot.moneyman.addMoney(message.guild, message.author.id, am)
  }
})