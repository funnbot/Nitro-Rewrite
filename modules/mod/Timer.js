class Timer {
  constructor(bot) {
    this.bot = bot
    this.timers = {}

    this.toRestart = {}
    this.getStored()
    this.restartTimeouts()
  }

  async unBan(a) {
    delete this.timers[a.id]
    let modDB = this.bot.mod.g(a.guild)
    if (!modDB.tempbans) modDB.tempbans = {}
    delete modDB.tempbans[a.id]
    this.bot.mod.s(a.guild, modDB)
    let guild = this.bot.guilds.get(a.guild)
    if (!guild) return
    try {
      let user = await this.bot.fetchUser(a.id)
      if (!user) return
      await guild.unban(user.id)
      await user.send("**Your tempban has ended from " + guild.name + ".**")
      let mod = await guild.fetchMember(a.moderator)
      if (!mod) return
      await mod.send("**The user you tempbanned: " + user.tag + ", has been unbanned.**")
    } catch (err) {
      console.log(err)
    }
  }

  async unMute(a) {
    delete this.timers[a.id]
    let modDB = this.bot.mod.g(a.guild)
    if (!modDB.mutes) modDB.mutes = {}
    delete modDB.mutes[a.id]
    this.bot.mod.s(a.guild, modDB)
    let guild = this.bot.guilds.get(a.guild)
    if (!guild) return
    try {
      let member = await guild.fetchMember(a.id)
      if (!member) return
      let Muted = member.roles.find("name", "Muted")
      if (!Muted) return
      await member.removeRole(Muted)
      await member.user.send("**Your mute has ended in " + guild.name + ".**")
    } catch (err) {
      console.log(err)
    }
  }

  add(a) {
    if (this.timers[a.id]) return null
    this.timers[a.id] = setTimeout(() => {
      if (a.action === "tempban") this.unBan(a)
      if (a.action === "mute") this.unMute(a)
    }, a.length)
    let modDB = this.bot.mod.g(a.guild)
    if (!modDB.tempbans) modDB.tempbans = {}
    if (a.action === "tempban") modDB.tempbans[a.id] = a
    if (!modDB.mutes) modDB.mutes = {}
    if (a.action === "mute") modDB.mutes[a.id] = a
    this.bot.mod.s(a.guild, modDB)
  }

  getStored() {
    for (let [id, s] of Object.entries(this.bot.mod.settings)) {
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

  restartTimeouts() {
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