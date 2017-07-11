const Extension = require("./Extension.js")
const { COLORS } = require("../config.js")

class MessageEmbedExtension extends Extension {

  get randomColor() {
    let index = Math.floor(Math.random() * COLORS.length)
    return COLORS[index]
  }

}

module.exports = MessageEmbedExtension