const { NitroClient, MessageHandler } = require("../../Nitro.js");
const bot = new NitroClient("economy");
bot.useTable("Economy");
module.exports = bot;
//Stock Market
const StockMarket = require("./StockMarket.js");
bot.stockmarket = new StockMarket();

//Message Handler
const Message = new MessageHandler(bot, {
    moneyManager: true
})

Message.on("create", message => {
    let waiting = message.author.check("messagemoney");
    if (Date.now() - waiting > 2000) message.author.del("messagemoney");
    if (!message.author.check("messagemoney")) {
        message.author.add("messagemoney", Date.now());
        let am = (Math.floor(Math.random() * 3) + 1) / 100;
        message.member ? message.member.addBalance(am) : 0;
    }
})