const regex = require("./Regex.js")

module.exports = Parse = {
    number(val) {
        return parseInt(val)
    },
    user(val, message) {
        return val
    },
    channel(val, message) {
        return val
    },
    role(val, message) {
        return val
    }
}