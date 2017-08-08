const regex = require("./Regex.js")
const escapeMarkdown = require("discord.js").escapeMarkdown

module.exports = Parse = {
    number(val) {
        return parseInt(val)
    },
    async user(val, message) {
        if (regex.user.mention.test(val)) {
            let id = val.replace(/[^0-9]/g)
            return await fetchUser("id", message, id)
        }
        if (regex.id.test(val)) {
            return await fetchUser("id", message, val)
        }
        if (regex.user.name.test(val)) {
            return await fetchUser("name", message, val)
        }
        return false
    },
    async channel(val, message) {
        if (regex.channel.mention.test(val)) {
            let id = val.replace(/[^0-9]/g)
            return await fetchChannel("id", message, id)
        }
        if (regex.id.test(val)) {
            return await fetchChannel("id", message, val)
        }
        if (regex.channel.name(val)) {
            return await fetchChannel("name", message, val)
        }
        return false
    },
    async role(val, message) {
        if (regex.role.mention.test(val)) {
            let id = val.replace(/[^0-9]/g)
            return await fetchRole("id", message, id)
        }
        if (regex.id.test(val)) {
            return await fetchRole("id", message, val)
        }
        if (regex.role.name.test(val)) {
            return await fetchRole("name", message, val)
        }
        return false
    }
}

let fetchUser = async(type, message, val) => {
    let bot = message.client
    let guild = message.guild
    if (!guild) return false
    if (type === "id") {
        try {
            let user = await bot.fetchUser(val)
            return user || false
        } catch (err) {
            return false
        }
    }
    if (type === "name") {
        try {
            await guild.fetchMembers()
            let matches = guild.members.filter(memberFilter(val.toLowerCase()))
            if (matches.size === 0) return false
            if (matches.size === 1) return matches[0].user
            else {
                message.channel.send("Multiple users found. Please be more specific.")
                return false
            }
        } catch (err) {
            return false
        }
    }
}

let fetchChannel = (type, message, id) => {
    let guild = message.guild
    if (!guild) return false
    if (type === "id") return guild.channels.get(id)
    if (type === "name") {
        let matches = guild.channels.filter(channelFilter(val.toLowerCase()))
        if (matches.size === 0) return false
        if (matches.size === 1) return matches[0]
        else {
            message.channel.send("Multiple channels found. Please be more specific")
            return false
        }
    }
}

let fetchRole = (type, message, id) => {
    let guild = message.guild
    if (!guild) return false
    if (type === "id") return guild.roles.get(id)
    if (type === "name") {
        let matches = guild.roles.filter(roleFilter(val.toLowerCase()))
        if (matches.size === 0) return false
        if (matches.size === 1) return matches[0]
        else {
            message.channel.send("Multiple roles found. Please be more specific.")
        }
    }
}

let memberFilter = search => {
    return mem => mem.user.username.toLowerCase().includes(search) ||
        (mem.nickname && mem.nickname.toLowerCase().includes(search)) ||
        (`${mem.user.username.toLowerCase()}#${mem.user.discriminator}`.includes(search))
}

let channelFilter = search => {
    return channel => channel.name.toLowerCase().includes(search) ||
        (channel.name.toLowerCase().replace(/[-_]/g, " ").includes(search))
}

let roleFilter = search => {
    return role => role.name.toLowerCase().includes(search)
}