Object.defineProperties(String.prototype, {
    log: {
        value: function() {
            console.log(this)
            return this.toString()
        },
    },
    bold: {
        value: function() {
            return ("**" + this + "**").toString()
        }
    },
    unindent: {
        value: function() {
            const lines = this.split("\n").filter(l => l)
            const base = lines[0].match(/^\s*/)
            return lines.map(l => l.replace(base, "")).join("\n")
        }
    }
})