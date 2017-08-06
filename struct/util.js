const formatCur = require("format-currency")
const config = require("../config.js")
const formatOpts = {
  format: "%s%v %c",
  symbol: config.CUR.sym,
  code: config.CUR.icon
}

class Util {
  static cleanVarName(name) {
    if (!name) return null
    if (name.replace(/\s+/g, "").length < 1) return false
    name = name.replace(/\s/g, "-")
    name = name.toLowerCase()
    return name
  }

  static pullProps(obj, props) {
    return props.reduce((o, p) => {
      o[p] = obj[p]
      return o
    }, {})
  }

  static formatBal(n) {
    return formatCur(n, formatOpts)
  }

  static _decimalAdjust(type, value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) return Math[type](value);
    value = +value;
    exp = +exp;
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) return NaN;
    if (value < 0) return -decimalAdjust(type, -value, exp);
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }

  static round(num, exp) {
    return this._decimalAdjust("round", num, -(exp))
  }

  static round100(num) {
    return this.round(num, 2)
  }
}

module.exports = Util