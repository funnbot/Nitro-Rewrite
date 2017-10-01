const Nitro = require("../../../Nitro.js")
const ConfigMenu = require("../../../struct/ConfigMenu.js");

module.exports = new Nitro.Command({
    help: "Exempt users, channels, or roles from the filter.",
    example: "${p}filterexc add @Funnbot || ${p}filterexc add @Admins || ${p}filterexc del #advertisements",
    argExample: "<add/del> <user/channel/role>",
    userPerms: 2,

    run: async(message, bot, send) => {
        const menu = new ConfigMenu(message);

        menu.setTitle("Chat Filter Config")
            .setDescription("Configure Nitro's chat filter to make exceptions or deal punishments.")
            .addItem("exceptions", {
                info: "Make users, roles, or channels ignored by the filter.",
                type: "sub",
                items: {
                    add: {
                        info: "Add a user, role, or channel.",
                        type: "sub",
                        items: {
                            user: {
                                info: "A user to add",
                                type: "user"
                            },
                            role: {
                                info: "A role to add",
                                type: "role"
                            },
                            channel: {
                                info: "A channel to add",
                                type: "channel"
                            }
                        }
                    },
                    remove: {
                        info: "Remove a user, role, or channel",
                        type: "sub",
                        items: {
                            user: {
                                info: "A user to add",
                                type: "user"
                            },
                            role: {
                                info: "A role to add",
                                type: "role"
                            },
                            channel: {
                                info: "A channel to add",
                                type: "channel"
                            }
                        }
                    }
                }
            })
            .addItem("punishments", {
                info: "Assign the punishments for using filtered words.",
                type: "sub",
                items: {
                    kick: {
                        info: "The number of strikes to kick.",
                        type: "number",
                        max: 25,
                        set: (val, guild) => {
                            guild.set("Filter", "kick", val);
                        }
                    },
                    ban: {
                        info: "The number of strikes to ban.",
                        type: "number",
                        min: 25,
                        set: (val, guild) => {
                            guild.set("Filter", "ban", val);
                        }
                    }
                }
            })
            .send();
    }
})