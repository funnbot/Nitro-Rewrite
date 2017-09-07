const Extension = require("./Extension.js")
const { COLORS } = require("../config.js")

class MessageEmbedExtension extends Extension {

    /**
     * A random embed color.
     * @deprecated
     * @returns {String}
     */
    get randomColor() {
        let index = Math.floor(Math.random() * COLORS.length);
        return COLORS[index];
    }

    /**
     * Set a random nitro color.
     * @returns {Void}
     */
    nitroColor() {
        let index = Math.floor(Math.random() * COLORS.length);
        this.color = parseInt(COLORS[index].replace("#", ""), 16);
        return this;
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