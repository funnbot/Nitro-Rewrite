const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Get information on donating to Nitro.",
    example: "${p}donate",
    alias: ["patreon", "patron", "paypal"],

    run: async(message, bot, send) => {
        const embed = new bot.Embed()
            .setTitle("Donate To Nitro!")
            .setDescription("The popularity of Nitro has blown me away and its so wonderful that so many people find the bot useful, that being said, the cost of a good server is well beyond my pocket and I rely on people like you to allow me to spend as much time developing as I do. Donating will give* you the patron role in Nitro's official server, the patron only channel, and access to patron only commands. If you do not with to donate with money, I am still in need of asset designers, documentors, and developers, who's help would be extremely appreciated.")
            .addField("Patreon", "<https://patreon.com/nitrobot>")
            .addField("Paypal", "<https://paypal.me/funnbot>")
            .setFooter("*A minimum donation of $5 or being a patreon subscriber is required to keep your patron status.")
            .nitroColor()

        if (message.channel.permissionsFor(bot.user).has("EMBED_LINKS")) 
            return send({embed})
        else return send(embed.asMessage())
    }
})