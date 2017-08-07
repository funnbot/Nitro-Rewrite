module.exports = Validate = {
  user(val) {
    return /^.{2,32}$/.test(val)
  },
  string(val) {
    if (typeof val === "string") {
      return val.length < maxStringLength
    }
  },
  word(val) {
    return validate.string(val) && !val.includes(" ")
  },
  number(val) {
    val = parseInt(val) || false
    return typeof val === "number" && (val > minNumber && val < maxNumber)
  },
  user(val) {
    return validate.string(val) && /^.{2,32}#[0-9]{4}$/.test(val)
  },
  channel(val) {
    return validate.string(val) && /^#\d+$/.test(val)
  },
  duration(val) {
    return validate.string(val) && /^(\d{1,2}h)?(\d{1,2}m)?(\d{1,2}s)?$/.test(val)
  }
}