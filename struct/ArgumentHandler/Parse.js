const regex = require("./Regex.js")

module.exports = Parse = {
    number(val) {
        return parseInt(val)
    },
    user(val, message) {
        if (regex.user.mention.test(val)) {
            let id = val.replace(/[^0-9]/g)
            return await fetchUser(message, id)
        }
        if (regex.id.test(val)) {

        }
        if (regex.user.name.test(val)) {

        }
    },
    channel(val, message) {
        if (regex.channel.mention.test(val)) {

        }
        if (regex.id.test(val)) {

        }
        if (regex.channel.name(val)) {

        }
    },
    role(val, message) {
        if (regex.role.mention.test(val)) {

        }
        if (regex.id.test(val)) {

        }
        if (regex.role.name.test(val)) {

        }
    }
}

let fetchUserID = async (message, id) => {
    let bot = message.client
    try {
        let user = await bot.fetchUser(id)
        return user || false
    } catch(err) {
        return false
    }
}

let fetchUserName = async (message, id) => {
    
}

let fetchChannelID = (message, id) => {
    let guild = message.guild
    if (!guild) return false
    return guild.channels.get(id)
}

let fetchRoleID = (message, id) => {
    let guild = message.guild
    if (!guild) return false
    return guild.roles.get(id)
}
