const util = require("util")
const { TOKEN } = require("../../../config.js")

exports.run = (message, bot, send) => {

  if (!message.checkSuffix) {

    let txt = evalTxt("Funnbot", "Output", "100000", "An idiot who does not provide code when he evals.")

    return send(txt)

  }

  let processtime, start

  try {

    start = (new Date()).getTime()

    let evaled = eval(message.suffix)

    processtime = (new Date()).getTime() - start

    if (evaled instanceof Promise) {

      evaled.then(data => {

        if (typeof data === "object" || typeof data === "function") data = util.inspect(data)

        if (typeof data === "string") data = data.substring(0, 1800), data = data.replace("`", "")

        let txt = evalTxt(message.suffix, "Output", processtime, data)

        txt = clean(txt)

        return send(txt)

      })

    }

    if (typeof evaled === "object" || typeof evaled === "function") evaled = util.inspect(evaled)

    if (typeof evaled === "string") evaled = evaled.substring(0, 1800), evaled = evaled.replace("`", "")

    let txt = evalTxt(message.suffix, "Output", processtime, evaled)

    txt = clean(txt)

    return send(txt)

  } catch (e) {

    processtime = (new Date()).getTime() - start

    let txt = evalTxt(message.suffix, "Error", processtime, e)

    txt = clean(txt)

    return send(txt)

  }

}

let evalTxt = (a, b, c, d) => {
  return `
:inbox_tray: **Input:**
\`\`\`js
${a}\`\`\`
:outbox_tray: **${b}:**
\`\`\`${b === "Output" ? "js" : "prolog"}
${d}\`\`\`
\`Execution Time: ${c}MS\``
}

let clean = (t) => {
  let r = new RegExp(`${TOKEN}`, "g")
  t = t.replace(r, "MjgxNTcwNjc3Mjk4MDM2NzM2.C4Z6lg.5deyw9buVaqMxS-VIRnrFjpws8s")
  return t
}

exports.conf = {
  userPerm: ["DEV"],
  botPerm: ["SEND_MESSAGES"],
  coolDown: 0,
  dm: true,
  help: "Eval a bit o code",
}
