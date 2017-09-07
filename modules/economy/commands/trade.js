const Nitro = require("../../../Nitro.js")

module.exports = new Nitro.Command({
    help: "Trade money with friends.",
    example: "${p}trade @Funnbot 100000000",
    argExample: "<user> <amount>",
    alias: ["tradebal"],
    args: [
        {
            type: "number",
            prompt: "How much?",
        },
        {
            type: "user",
            prompt: "With who?"
        }
    ],

    run: async(message, bot, send) => {
        if (message.args[1].id === message.author.id) return message.fail("You can't trade money with yourself.");
        let member = message.member;
        await message.guild.members.fetch(message.args[1]);
        let target = message.guild.member(message.args[1]);
        if (!target) return;
        let am = message.args[0];

        if (am > member.balance) return message.fail("You don't have that much money.");
        member.removeBalance(am);
        member.addBalance(am);
        return message.succ(`New balances - ${member.user.tag}: ${member.balFormat()}, ${target.user.tag}: ${target.balFormat()}`);
    }
})