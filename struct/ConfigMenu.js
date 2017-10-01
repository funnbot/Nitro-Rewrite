const Discord = require("discord.js");
const { NUMBERS } = require("../config.js");
const EventEmitter = require("events");

class ConfigMenu extends EventEmitter {

    constructor({ author, channel, client }) {
        super();
        this.author = author;
        this.channel = channel;
        this.bot = client;

        this.messageID = null;

        this.type = "sub";
        this.title = undefined;
        this.description = undefined;
        this.color = undefined;
        this.footer = "Respond with the corresponding number to select an option.";
        this.items = {};
        this.map = [];
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setDescription(description) {
        this.description = description;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setFooter(footer) {
        this.footer = footer;
        return this;
    }

    addItem(name, item) {
        this.items[name] = item;
        return this;
    }

    send() {
        let embed = this.buildEmbed(this);
        this.channel.send({ embed }).then(m => {
            this.messageID = m.id
            this.processMenu(this);
        });
    }

    edit(item) {
        let embed = this.buildEmbed(item);
        this.channel.messages.fetch(this.messageID).then(m => {
            m.edit({ embed }).catch(() => this.emit("kill"))
        }).catch(() => this.emit("kill"))
    }

    /** @private */
    processMenu(item) {
        console.log(item);
        if (item.type === "sub") {
            if (!item.bot) item.items.back = {
                info: "Go back a menu",
                type: "sub"
            }, this.edit(item)
            this.subMenu(item);
        } else this.menu(item);
    }

    menu(item) {
        
    }

    subMenu(item) {
        let co = this.collect(m => {
            let keys = Object.keys(item.items);
            let c = m.content.toLowerCase()
            if (keys.includes(c)) {
                console.log(m.content)
                this.processMenu(item.items[c]);
                co.stop("next");
            } else if (keys[parseInt(c)]) {
                console.log(m.content)
                this.processMenu(item.items[keys[parseInt(c)]]);
                co.stop("next");
            } else {
                this.channel.send("**Invalid Menu**").then(msg => {
                    msg.delete(1000).catch(() => this.emit("kill"), co.stop("kill"))
                }).catch(() => this.emit("kill"), co.stop("kill"))
            }
        })
    }

    /** @private */
    buildEmbed(item) {
        const embed = new Discord.MessageEmbed();

        embed.setTitle(item.title || this.title)
            .setDescription(item.description || this.description)
            .setColor(item.color || this.color || embed.randomColor)
            .setFooter(item.footer || this.footer);

        let i = 0;
        for (let [key, value] of Object.entries(item.items || {})) {
            embed.addField(NUMBERS[i] + " " + key, value.info);
            i++
        }

        return embed;
    }

    /** @private */
    collect(filter, time = 30000) {
        let c = this.channel.createMessageCollector(m => m.author.id === this.author.id, { time })
        c.on("collect", (m) => filter(m, c));
        return c;
    }

}

module.exports = ConfigMenu;