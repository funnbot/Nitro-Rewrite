class Timer {
    constructor(bot) {
        this.bot = bot
        this.timers = {}

        this.toRestart = {}
        this.getStored()
        this.restartTimeouts()
    }

    async unBan (a) {
        clearTimeout(this.timers[a.id]);
        delete this.timers[a.id];
        let tempbans = this.guild.get("Moderation", "tempbans");
        delete tempbans[a.id];
        this.guild.set("Moderation", "tempbans", tempbans);
        let guild = this.bot.guilds.get(a.guild)
        if (!guild) return
        try {
            let user = await this.bot.users.fetch(a.id)
            if (!user) return
            await guild.unban(user.id)
            await user.send("**Your tempban has ended in " + guild.name + ".**")
            let mod = await guild.members.fetch(a.moderator)
            if (!mod) return
            await mod.send("**The user you tempbanned: " + user.tag + ", has been unbanned.**")
        } catch (err) {
            console.log(err)
        }
    }

    async unMute (a) {
        clearTimeout(this.timers[a.id]);
        delete this.timers[a.id]
        let mutes = this.guild.get("Moderation", "mutes");
        delete mutes[a.id];
        this.guild.set("Moderation", "mutes", mutes);
        let guild = this.bot.guilds.get(a.guild);
        if (!guild) return;
        try {
            let member = await guild.members.fetch(a.id)
            if (!member) return
            let Muted = member.roles.find("name", "Muted")
            if (!Muted) return
            await member.removeRole(Muted)
            await member.user.send("**Your mute has ended in " + guild.name + ".**")
        } catch (err) {
            console.log(err)
        }
    }

    add (a) {
        this.timers[a.id] = setTimeout(() => {
            if (a.action === "tempban") this.unBan(a)
            if (a.action === "mute") this.unMute(a)
        }, a.length)
        let db = this.guild.get("Moderation", a.action);
        db[a.id] = a;
        this.guild.set("Moderation", a.action, db);
    }

    getStored () {
        let stored = this.bot.table("Moderation").cache
        for (let [id, s] of stored.entries()) {
            if (s.tempbans) {
                for (let [userid, tb] of Object.entries(s.tempbans)) {
                    this.toRestart[userid] = tb
                }
            }
            if (s.mutes) {
                for (let [userid, m] of Object.entries(s.mutes)) {
                    this.toRestart[userid] = m
                }
            }
        }
    }

    restartTimeouts () {
        for (let [id, a] of Object.entries(this.toRestart)) {
            let now = Date.now(),
                st = a.started,
                lt = a.length,
                e = st + lt
            if (e < now) {
                if (a.action === "tempban") this.unBan(a)
                if (a.action === "mute") this.unMute(a)
            } else {
                a.length = e - now
                this.add(a)
            }
        }
    }

}

module.exports = Timer