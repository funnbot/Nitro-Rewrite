Object.defineProperties(String.prototype, {
    log: {
        value: function() {
            console.log(this)
            return this.toString()
        },
    },
    /**
     * Markdown Bold a string.
     * @return {String}
     */
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
    },
    contains: {
        value: function(...texts) {
            for (let t of texts) if (this.includes(t)) return true;
        }
    }
})

function typeof2(value) {
    return value instanceof Array ? "array" : typeof value;
}

function forOf(iter, callback) {
    typeof2(iter) !== "object" || (iter = Object.entries(iter));
    let iterations = iter.length === undefined ? iter : iter.length
    let index = 0;
    console.log(iter)
    while (index < iterations) {
        let result = typeof2(iter) === "array" ? [iter[index], index] : [index]
        callback(...result)
        index++;
    }
}

async function forOfAsync(iter, callback) {
    typeof2(iter) !== "object" || (iter = Object.entries(iter));
    let iterations = iter.length || iter
    let index = 0;
    while (index < iterations) {
        console.log(index)
        const result = [iter[index], index] || [index]
        await callback(result)
        index++;
    }
}

Object.defineProperties(global, { forOf: { value: forOf }, forOfA: { value: forOfAsync }, typeof2: { value: typeof2 } })