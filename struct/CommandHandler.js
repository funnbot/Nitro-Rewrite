const fs = require('fs')

class CommandHandler {

    constructor(key) {

        this.commands = {}

        this.path = `./modules/${key}/commands`

        this.commandFiles = fs.readdirSync(this.path)

        for (let commandFile of this.commandFiles) {

            commandFile = commandFile.slice(0, -3)

            let command = require(`.${this.path}/${commandFile}`)

            this.commands[commandFile] = command

        }

    }

    fetch() {
        return this.commands
    }

}

module.exports = CommandHandler