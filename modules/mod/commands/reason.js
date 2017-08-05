const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
  help: "Set the reason for a case.",
  example: "${p}reason 246 Sending bad images in every channel",
  argExample: "<caseNumber> <reason>",
  dm: false,
  coolDown: 1,
  userPerms: 1,
  botPerms: [],

  args: [
    {
      desc: "What is the case number?",
      type: "name"
    },
    {
      desc: "What is the reason?",
      type: "text"
    }
  ],

  run: async (message, bot, send) => {
    let caseNum = parseInt(message.args[0]) || false
    if (!caseNum) return send("**What is the case number?**")

    let reason = message.suffixOf(1)
    reason = reason.length < 1 ? false : reason
    if (!reason) return send("**What is the reason?**")
    if (reason.length < 3) return send("**Invalid Reason**")

    let caseman = message.guild.check("caseman")
    if (!caseman) throw new Error("CaseManager Initialization Failed")

    let cases = caseman.cases
    if (caseNum > cases.length || caseNum < 1) return send("**Invalid Case Number**")
    let Case = cases[caseNum - 1]
    let owner = Case.moderator.id
    if (message.author.id !== owner && !message.channel.permissionsFor(message.author).has("ADMINISTRATOR")) return send("**You are not the responsible moderator for this case**")

    try {
      await caseman.editReason(caseNum, reason)
      return send("**Case #"+caseNum+"'s reason was updated**")
    } catch(err) {
      return send("**Reason Update Failed:** " + err.message)
    }
  }
})
