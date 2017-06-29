const Extension = require('./Extension')

class MessageExtension extends Extension {
    
    get cutPrefix() {
        let prefix = this.client.prefix.get(this.guild ? this.guild.id : "1234")
        return this.content.slice(prefix.length)
    }

    get command() {
        return this.cutPrefix.split(" ")[0]
    }

    get args() {
        return this.cutPrefix.split(" ").slice(1)
    }

    get suffix() {
        return this.args.join(" ")
    }

    get checkSuffix() {
        return this.suffix.replace(/\s/g, '').length > 1
    }

    get send() {
        return this.channel.send.bind(this.channel)
    }
}

module.exports = MessageExtension