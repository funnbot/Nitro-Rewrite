const Extension = require("./Extension.js")
const { COLORS } = require("../config.js")

class MessageEmbedExtension extends Extension {

  get randomColor() {
    let index = Math.floor(Math.random() * COLORS.length)
    return COLORS[index]
  }

  actionColor(action) {
    return {
      ban: "#B71C1C",
      tempban: "#D32F2F",
      softban: "#F44336",
      kick: "#F57C00",
      mute: "#FF9800",
      warn: "#FDD835",
      unban: "#76FF03"
    }[action]
  }

}

module.exports = MessageEmbedExtension