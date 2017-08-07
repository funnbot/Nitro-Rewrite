module.exports = Validate = {
  string(val, opts) {
    
  },
  word(val) {
    return validate.string(val) && !val.includes(" ")
  },
  number(val, opts) {
    val = parseInt(val) || false
    return typeof val === "number" && (val > minNumber && val < maxNumber)
  },
  selection(val, opts) {

  },
  duration(val, opts) {

  },
  user(val) {
    return validate.string(val) && /^.{2,32}#[0-9]{4}$/.test(val)
  },
  channel(val) {
    return validate.string(val) && /^#\d+$/.test(val)
  },
}