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
    "asshole",
    "penis",
    "nigger",
    "faggot",
], true);

function con(array, a) {
    if (a) array.map(b => b.split("").join("+"));
    return new RegExp(`${array.join("|")}`, "i");
}