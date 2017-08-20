module.exports = {
    //Me
    FUNNBOT: "163735744995655680",
    //How many shards to spawn
    SHARDS: 1,
    //The Currency
    CUR: {
        toString() {
            return "USD"
        },
        code: ":dollar:",
        sym: "$"
    },
    //Channels i need
    CHANNELS: {
        STATUS: "341048367737995274"
    },
    TABLES: {
        Prefix: ".",

        Alias: {},

        UserPerm: false,

        Tag: {
            tags: {},
            hideuser: false
        },

        Moderation: {
            channel: null,
            cases: [],
            mutes: {},
            tempbans: {}
        },

        Economy: {
            users: {},
        },

        IRC: { // Needs change feed
            state: "off",
        },

        Trivia: 0, // Needs change feed

        Game: {},

        MemberLog: {
            channel: null,
            join: null,
            leave: null
        }
    },
    //The "Companies" and their keys used in stock market
    STOCKS: {
        FunnCorp: {
            key: "FNN",
            base: 38.90,
        },
        Nitro: {
            key: "NTO",
            base: 11.41
        },
        MopBot: {
            key: "MPB",
            base: 9.16
        },
        Discord: {
            key: "DSC",
            base: 5.98
        },
        Pancake: {
            key: "PAN",
            base: 3.91
        },
        Martin: {
            key: "MTN",
            base: 1.62
        },
        Alfred: {
            key: "ALF",
            base: 0.55
        }
    },
    //Map permission names to a easier to read format
    PERMISSIONS: {
        ADMINISTRATOR: "Administrator",
        CREATE_INSTANT_INVITE: "Create Instant Invite",
        KICK_MEMBERS: "Kick Members",
        BAN_MEMBERS: "Ban Members",
        MANAGE_CHANNELS: "Manage Channels",
        MANAGE_GUILD: "Manage Server",
        ADD_REACTIONS: "Add Reactions",
        VIEW_AUDIT_LOG: "View Audit Log",
        READ_MESSAGES: "Read Messages",
        SEND_MESSAGES: "Send Messages",
        SEND_TTS_MESSAGES: "Send TTS Messages",
        MANAGE_MESSAGES: "Manage Messages",
        EMBED_LINKS: "Embed Links",
        ATTACH_FILES: "Attach Files",
        READ_MESSAGE_HISTORY: "Read Message History",
        MENTION_EVERYONE: "Mention Everyone",
        USE_EXTERNAL_EMOJIS: "Use External Emojis",
        CONNECT: "Voice Connect",
        SPEAK: "Voice Speak",
        MUTE_MEMBERS: "Voice Mute Members",
        DEAFEN_MEMBERS: "Voice Deafen Members",
        MOVE_MEMBERS: "Voice Move Members",
        USE_VAD: "Use Voice Activity",
        CHANGE_NICKNAME: "Change Nickname",
        MANAGE_NICKNAMES: "Manage Nicknames",
        MANAGE_ROLES: "Manage Roles",
        MANAGE_WEBHOOKS: "Manage Webhooks",
        MANAGE_EMOJIS: "Manage Emojis"
    },
    //Colors used in embed.randomColor
    COLORS: [
        "#03A9F4",
        "#039BE5",
        "#0288D1",
        "#0277BD",
        "#2196F3",
        "#1E88E5",
        "#1976D2",
        "#2962FF",
        "#448AFF",
        "#2979FF",
        "#2196F3",
        "#1E88E5",
        "#1976D2",
        "#1565C0",
        "#0091EA"
    ]

}