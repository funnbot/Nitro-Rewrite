exports.adverts = con([
    "discord.gg/.+",
    "discordapp.com/invite/.+"
]);

exports.curses = con([
    "fuck",
    "cunt",
    "shit",
    "cock",
    "dick",
    "pussy",
    "ass",
    "penis"
], true);

function con(array, a) {
    if (a) array = array.map(a => a.split("").join("\s*"))
    return new RegExp(`${array.join("|")}`, "i")
}