const Memcached = require("memcached");

class Meme {
    constructor(...args) {
        this.meme = new Memcached(...args);
    }

    get(key) {
        if (Array.isArray(key))
            return this.command("getMulti", key);
        else
            return this.command("get", key);
    }

    gets(key) {
        return this.command("gets", key);
    }

    set(key, value, lifetime) {
        return this.command("set", key, value, lifetime);
    }

    replace(key, value, lifetime) {
        return this.command("replace", key, value, lifetime);
    }

    add(key, value, lifetime) {
        return this.command("add", key, value, lifetime);
    }

    cas(key, value, lifetime, cas) {
        return this.command("cas", key, value, lifetime, cas);
    }

    append(key, value) {
        return this.command("append", key, value);
    }

    prepend(key, value) {
        return this.command("prepend", key, value);
    }

    incr(key, amount) {
        return this.command("incr", key, amount);
    }

    decr(key, amount) {
        return this.command("decr", key, amount);
    }

    del(key) {
        return this.command("del", key);
    }

    version() {
        return this.command("version");
    }

    flush() {
        return this.command("flush")
    }

    stats() {
        return this.command("stats");
    }

    settings() {
        return this.command("settings");
    }

    slabs() {
        return this.command("slabs");
    }

    items() {
        return this.command("items");
    }

    cachedump(server, slabid, number) {
        return this.command("cashdump", server, slabid, number);
    }

    end() {
        return this.command("end");
    }

    command(cmd, ...args) {
        return new Promise((resolve, reject) => {
            this.meme[cmd](...args, (err, data) => {
                if (err) return reject(err);
                return resolve(data);
            })
        })
    }
}

module.exports = Meme;