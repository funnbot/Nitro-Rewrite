// Imports
let Discord = require("discord.js");
const Status = require("./Status.js");
const Sentry = require("raven");
const DatabaseManager = require("./DatabaseManager.js");
const { TOKEN } = require("../auth");
const { TABLES } = require("../config.js");

// d.js class extensions
const ClientExtension = require("../extensions/ClientExtension.js");
const MessageExtension = require("../extensions/MessageExtension.js");
const MessageEmbedExtension = require("../extensions/MessageEmbedExtension.js");
const ChannelExtension = require("../extensions/ChannelExtension.js");
const UserExtension = require("../extensions/UserExtension.js");
const GuildExtension = require("../extensions/GuildExtension.js");
const NativeExtensions = require("../extensions/NativeExtensions.js");

ClientExtension.extend(Discord.Client);
MessageExtension.extend(Discord.Message);
MessageEmbedExtension.extend(Discord.MessageEmbed);
ChannelExtension.extend(Discord.Channel);
UserExtension.extend(Discord.User);
GuildExtension.extend(Discord.Guild);
// d.js class extensions

const defaultOptions = {
    disabledEvents: ["TYPING_START"]
}

const defaultTables = ["Prefix", "Alias", "UserPerm"]
const allTables = Object.keys(TABLES)

class NitroClient extends Discord.Client {
    constructor(module, clientOptions = defaultOptions) {
        super(clientOptions)

        //The Module Name
        this.module = module

        //Sentry Error Tracking
        Sentry.config(this.config.auth.SENTRY).install()
        this.sentry = Sentry

        //In memory storage
        this.active = {
            channel: {},
            guild: {},
            user: {}
        }

        //Initiate DatabaseManager
        this.DatabaseManager = new DatabaseManager(this)

        //The tables loaded
        this.tables = clientOptions.disableDefaultTables ? [] : clientOptions.useAllTables ? allTables : defaultTables

        //Basic Events
        this.unhandledRejection()
        this._readyEvent(once => {
            console.log(once ? `Module ${this.module} is ready using ${this.shard.count} shards.` : `Module ${this.module} reconnected.`)
            if (once) this._setupTables()
        })

        //Log the bot in
        this.login(TOKEN)
    }

    useTable(...args) {
        for (let table of args) {
            this.tables.push(table)
        }
    }

    table(table) {
        return this.DatabaseManager.table(table)
    }

    get ready() {
        return this._readyEvent
    }

    async _setupTables() {
        await this.DatabaseManager.createDB()
        for (let t of this.tables) {
            if (Array.isArray(t)) this.DatabaseManager.add(t)
            else this.DatabaseManager.add(t, true)
        }
    }

    unhandledRejection() {
        //Log all uncaught exceptions
        process.on("unhandledRejection", (e) => this.logger.error(e.stack))
    }

    _readyEvent(ready) {
        let once = true
        this.on("ready", () => {
            ready(once)
            once = false
        })
    }

}

module.exports = NitroClient