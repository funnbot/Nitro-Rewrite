//Its faster or something?
global.Promise = require("bluebird");

// Imports
let Discord = require("discord.js");
const Status = require("./Status.js");
const Sentry = require("raven");
const os = require("os");
const Memecached = require("./Memcached.js");
const DatabaseManager = require("./DatabaseManager.js");
const { TOKEN, MEMCACHED } = require("../auth");
const { TABLES, GAMES } = require("../config.js");

// class extensions
const ClientExtension = require("../extensions/ClientExtension.js");
const MessageExtension = require("../extensions/MessageExtension.js");
const MessageEmbedExtension = require("../extensions/MessageEmbedExtension.js");
const ChannelExtension = require("../extensions/ChannelExtension.js");
const UserExtension = require("../extensions/UserExtension.js");
const GuildExtension = require("../extensions/GuildExtension.js");
const GuildMemberExtension = require("../extensions/GuildMemberExtension.js");
const NativeExtensions = require("../extensions/NativeExtensions.js");
const ShardClientUtilExtension = require("../extensions/ShardClientUtilExtension.js");

ClientExtension.extend(Discord.Client);
MessageExtension.extend(Discord.Message);
MessageEmbedExtension.extend(Discord.MessageEmbed);
ChannelExtension.extend(Discord.Channel);
UserExtension.extend(Discord.User);
GuildExtension.extend(Discord.Guild);
GuildMemberExtension.extend(Discord.GuildMember);
ShardClientUtilExtension.extend(Discord.ShardClientUtil);
// class extensions

const defaultOptions = {
    disabledEvents: ["TYPING_START"]
}

const defaultTables = ["Prefix", "Alias", "UserPerm", "Usage"]
const allTables = Object.keys(TABLES)

/**
 * Nitro's Modular Client
 * @class NitroClient
 * @extends {Discord.Client}
 * @param {String} module
 * @param {Object} [clientOptions=defaultOptions]
 */
class NitroClient extends Discord.Client {

    constructor(module, clientOptions = defaultOptions) {
        super(clientOptions);

        //The Module Name
        this.module = module;

        //Sentry Error Tracking
        Sentry.config(this.config.auth.SENTRY).install();
        this.sentry = Sentry;

        //In memory storage
        /** @deprecated */
        this.active = {
            channel: {},
            guild: {},
            user: {}
        };

        //In memory storage
        this.SimpleStorage = {
            guild: {},
            channel: {},
            user: {}
        };

        //Memcached
        this.mem = new Memecached(MEMCACHED)

        //Initiate DatabaseManager
        this.DatabaseManager = new DatabaseManager(this);

        //Reasons
        process.setMaxListeners(20);

        //The tables to load
        this.tables = clientOptions.disableDefaultTables ? [] : clientOptions.useAllTables ? allTables : defaultTables;

        //Basic Events
        this._unhandledRejection();
        this._ready();

        //Log the bot in
        this.login(TOKEN);

        this.initializeTime = Date.now();
    }

    useTable(...args) {
        for (let table of args) {
            this.tables.push(table);
        }
    }

    table(table) {
        return this.DatabaseManager.table(table);
    }

    _ready() {
        let once = true
        this.on("ready", () => {
            const t = this.readyTimestamp - this.initializeTime;
            console.log(once ? `Module ${this.module} is ready using ${this.shard.count} shards. Startup took: ${t}MS` : `Module ${this.module} reconnected.`);
            if (once) {
                this.saveStats();
                this._setupTables()
            };
            this.isBeta = this.user.id !== "264087705124601856";
            once = false;
        })
    }

    async _setupTables() {
        //await this.DatabaseManager.createDB()
        for (let t of this.tables) {
            if (Array.isArray(t)) this.DatabaseManager.add(t[0])
            else this.DatabaseManager.add(t, true)
        }
    }

    async saveStats() {
        try {
            var saved = await this.mem.get("stats");
        } catch (e) {
            return console.log("SAVE_STATS", e);
        }

        const mem = process.memoryUsage().rss / 1024 / 1024;
        const cpu = os.loadavg();
        const stats = {
            m: Math.round(mem),
            c: Math.ceil(cpu[1] * 100) / 10
        }

        if (!saved) saved = {};
        if (!saved[this.module]) saved[this.module] = [];
        saved[this.module][this.shard.id] = stats;

        try {
            await this.mem.set("stats", saved, 0);
        } catch (e) {
            return console.log("SAVE_STATS", e);
        }

        setTimeout(() => this.saveStats(), 1000 * ((Math.random() + 1) * 1000))
    }

    _unhandledRejection() {
        //Log all uncaught exceptions
        process.on("unhandledRejection", (e) => this.logger.error(e.stack))
    }

}

module.exports = NitroClient