const logger = require("./Logger")
const fs = require("fs")

class CommandLoader {
    constructor(key) {
        this.key = key;
        this.commands = {};
        this.allCommands = {};
        this.path = `./modules/${key}/commands`;

        this.globalCommands = ["../modules/dev/commands/eval"]

        this.loadCommands();
        this.loadGlobal();
    }

    loadCommands() {
        const files = fs.readdirSync(this.path);

        for (let cmd of files) {
            const name = cmd.slice(0, -3);
            try {
                var load = require(`.${this.path}/${cmd}`);
            } catch (e) {
                console.log(cmd, e);
                continue;
            }

            if (Object.keys(load).length < 1) {
                console.log("EMPTY_COMMAND", cmd);
                continue;
            }

            this.commands[name] = load;
        }
    }

    loadGlobal() {
        for (let cmd of this.globalCommands) {
            let name = cmd.split("/");
            name = name[name.length - 1];

            try {
                var load = require(cmd);
            } catch (e) {
                console.log(name, e);
                continue;
            }

            if (Object.keys(load).length < 1) {
                console.log("EMPTY_COMMAND", name);
                continue;
            }

            this.commands[this.key + name] = load;
        }
    }

    readAll() {
        fs.readdir("./modules", (err, modules) => {
            if (err) return console.log("Error Reading Modules")
            for (let mod of modules) {
                fs.readdir(`./modules/${mod}/commands`, (err, files) => {
                    if (err) return;
                    for (let file of files) {
                        file = file.slice(0, -3)
                        try {
                            let command = require(`../modules/${mod}/commands/${file}`)
                            if (Object.keys(command).length < 1) continue;
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

    fetch() {
        return this.commands;
    }

    fetchAll() {
        return this.allCommands;
    }
}

module.exports = CommandLoader;