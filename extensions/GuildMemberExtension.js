const Extension = require("./Extension.js");
const Util = require("../struct/util.js");

class GuildMemberExtension extends Extension {
    // Money Manager
    useMoneyManager() {
        this.economyTable = true;
    }

    /**
     * The user's balance.
     * @memberof GuildMemberExtension
     * @returns {Number}
     */
    get balance() {
        if (!this.economyTable) throw new Error("Enable money manager to use balance.");
        let id = this.user.id;
        let users = this.guild.get("Economy", "users");
        return users[id] ? users[id].money || 0 : 0;
    }

    /**
     * The user's balance as a formatted string.
     * 
     * @param {Boolean} noCode
     * @param {Boolean} noSymbol
     * @returns {String}
     * @memberof GuildMemberExtension
     */
    balFormat(...args) {
        if (!this.economyTable) throw new Error("Enable money manager to use balance.");
        return Util.formatBal(this.balance, ...args);
    }

    /**
     * Set the user's balance.
     * @param {Number} amount The amount.
     * @memberof GuildMemberExtension
     * @returns {Number}
     */
    set balance(amount) {
        if (!this.economyTable) throw new Error("Enable money manager to use balance.");
        amount = Util.round100(amount);
        let id = this.user.id;
        let users = this.guild.get("Economy", "users");
        if (!users[id]) users[id] = {};
        users[id].money = amount;
        this.guild.set("Economy", "users", users);
        return users[id].money;
    }

    /**
     * Add to the user's balance.
     * 
     * @param {Number} amount 
     * @returns {Number}
     * @memberof GuildMemberExtension
     */
    addBalance(amount) {
        return this._editBalance(amount, "add");
    }

    /**
     * Remove from the user's balance.
     * 
     * @param {Number} amount 
     * @returns {Number}
     * @memberof GuildMemberExtension
     */
    removeBalance(amount) {
        return this._editBalance(amount, "remove");
    }

    /**
     * 
     * 
     * @param {any} amount 
     * @param {String} type "add" | "remove"
     * @returns {Number}
     * @private
     * @memberof GuildMemberExtension
     */
    _editBalance(amount, type) {
        if (!this.economyTable) throw new Error("Enable money manager to use balance.");
        let id = this.user.id;
        let users = this.guild.get("Economy", "users");
        if (!users[id]) users[id] = {};
        if (type === "add") users[id].money = Util.round100((users[id].money || 0) + amount);
        else if (type === "remove") users[id].money = Util.round100((users[id].money || 0) - amount);
        this.guild.set("Economy", "users", users);
        return users[id].money;
    }

    /**
     * User objects sorted by balance.
     * @readonly
     * @memberof GuildMemberExtension
     * @returns {Array<String, Object>}
     */
    get balTop() {
        let users = this.guild.get("Economy", "users");
        users = Object.entries(users).sort(([an, ak], [bn, bk]) => {
            return (bk.money || 0) - (ak.money || 0)
        });
        return users;
    }

}

module.exports = GuildMemberExtension;