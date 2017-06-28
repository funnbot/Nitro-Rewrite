module.exports = (message, bot) => {

    let prefix = bot.prefix.get(message.guild ? message.guild.id : "1234")
    let cutPrefix = message.content.slice(prefix.length)
    message.args = cutPrefix.split(' ')
    message.command = message.args[0]
    message.args = message.args.slice(1)
    message.suffix = message.args.slice(0).join(' ')

    return message

}