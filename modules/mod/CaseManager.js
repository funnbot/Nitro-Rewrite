const Nitro = require("../../Nitro.js")
const prettyms = require("pretty-ms")

class CaseManager {

    constructor(guild) {
        this.client = guild.client;
        this.guild = guild;
        this.cases = guild.get("Moderation", "cases");
        this.queued = [];
        this.executeQueue();
    }

    async executeQueue() {
        if (this.queued.length > 0) {
            let { moderator, user, action, optional } = this.queued[0];
            await this.createCase(moderator, user, action, optional);
            this.queued = this.queued.slice(1);
        }
        return setTimeout(() => this.executeQueue(), 200);
    }

    async editReason(num, reason) {
        let Case = this.cases[num - 1];
        Case.reason = reason.trim();
        this.cases[num - 1] = Case;
        this.guild.set("Moderation", "cases", this.cases)

        let regex = new RegExp(`Please do \`.reason ${Case.number} <reason>\``)
        let modlog = this.getModLog()
        if (!modlog) throw new Error("Moderator logs not found")
        let message
        try {
            message = await modlog.fetchMessage(Case.messageID)
        } catch (err) {
            throw new Error("Case message not found")
        }
        if (!message.embeds[0] || !message.embeds[0].description) throw new Error("Message embed not formatted")
        let embed = message.embeds[0]
        embed.setDescription(embed.description.replace(regex, reason))
        try {
            message.edit("", { embed })
        } catch (err) {
            throw new Error("Unable to edit message")
        }
        return Case
    }

    newCase(moderator, user, action, optional = {}) {
        this.queued.push({ moderator, user, action, optional })
    }

    getModLog() {
        let channelId = this.guild.get("Moderation", "channel");
        return this.guild.channels.get(channelId) || false;
    }

    async createCase(moderator, user, action, optional = {}) {
        let newCase = {
            number: this.cases.length + 1,
            moderator: Nitro.util.pullProps(moderator, ["username", "discriminator", "id", "avatar"]),
            user: Nitro.util.pullProps(user, ["username", "discriminator", "id", "avatar"]),
            action,
            reason: optional.reason || false,
            length: optional.length || false,
            timestamp: new Date()
        }
        let modlog = this.getModLog()
        if (!modlog) return
        if (!modlog.permissionsFor(this.client.user).has("SEND_MESSAGES")) return this.guild.owner.send("**I tried to send a message in the mod-log channel:** " + modlog.name + "**, but I lack permission.").catch()
        let messageID = await this.sendCase(modlog, newCase)
        if (!messageID) return
        newCase.messageID = messageID
        this.cases.push(newCase)
        this.guild.set("Moderation", "cases", this.cases)
        return newCase
    }

    sendCase(modlog, newCase) {
        return new Promise((resolve) => {
            let guildPrefix = this.guild.get("Prefix");
            let embed = new this.client.Embed()
            let mod = newCase.moderator
            let user = newCase.user
            embed.setAuthor(`Case: #${newCase.number}`, this.avatarURL(user.id, user.avatar))
            embed.setDescription(`**Moderator:** ${this.tag(mod.username, mod.discriminator)}
**User:** ${this.tag(user.username, user.discriminator)} (${user.id})
**Action:** ${newCase.action[0].toUpperCase() + newCase.action.slice(1)}${newCase.length ? `\n**Length:** ${prettyms(newCase.length)}` : ""}
**Reason:** ${newCase.reason || `Please do \`${guildPrefix}reason ${newCase.number} <reason>\``}`)
            embed.setColor(embed.actionColor(newCase.action))
            embed.setTimestamp(newCase.timestamp)

            modlog.send("", { embed })
                .then((msg) => resolve(msg.id))
                .catch(() => resolve(false))
        })
    }

    avatarURL(i, h) {
        return `https://cdn.discordapp.com/avatars/${i}/${h}.png`
    }

    tag(u, d) {
        return `${u}#${d}`;
    }

}

module.exports = CaseManager;