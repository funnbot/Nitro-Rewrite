const logger = require("./Logger")
const fs = require("fs")

class CommandHandler {
    constructor(key) {
        this.commands = {}
        this.allCommands = {}
        this.path = `./modules/${key}/commands`
        this.commandFiles = fs.readdirSync(this.path)
        for (let commandFile of this.commandFiles) {
            commandFile = commandFile.slice(0, -3)
            try {
                let command = require(`.${this.path}/${commandFile}`)
                if (Object.keys(command).length === 0) throw new Error("EMPTY_COMMAND")
                this.commands[commandFile] = command
            } catch (err) {
                logger.error(`Error Loading Command: .${this.path}/${commandFile} - \n` + err.stack)
            }
        }
        this.globalCommands = ["./modules/dev/commands/eval"]
        for (let cmd of this.globalCommands) {
            let name = cmd.split("/")
            name = name[name.length - 1]
            try {
                let command = require("." + cmd)
                this.commands[key + name] = command
            } catch (err) {
                logger.error(`Error Loading Command: .${cmd} - \n` + err.stack)
            }
        }
    }

    readAll() {
        fs.readdir("./modules", (err, modules) => {
            if (err) return console.log("Error Reading Modules")
            for (let mod of modules) {
                fs.readdir(`./modules/${mod}/commands`, (err, files) => {
                    if (err) return
                    for (let file of files) {
                        file = file.slice(0, -3)
                        try {
                            let command = require(`../modules/${mod}/commands/${file}`)
                            if (!this.allCommands[mod]) this.allCommands[mod] = {}
                            this.allCommands[mod][file] = command
                        } catch (err) {
                            logger.error(`Error Loading Command: ../modules/${mod}/commands/${file} - \n` + err.stack)
                        }
                    }
                })
            }
        })
    }

    fetchAll() {
        return this.allCommands
    }

    fetch() {
        return this.commands
    }

}

module.exports = CommandHandler