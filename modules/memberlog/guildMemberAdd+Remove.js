const snekfetch = require("snekfetch")
const bot = require("./bot.js")

//Member Join
bot.on("guildMemberAdd", (member) => {
    guildMember(member, "add")
})

//Member Leave
bot.on("guildMemberRemove", (member) => {
    guildMember(member, "remove")
})

let guildMember = (member, type) => {

}