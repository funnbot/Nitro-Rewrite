const Nitro = require("../../../Nitro.js");

module.exports = new Nitro.Command({
    help: 'Bio for FDA',
    example: '${p}FDA',
    dm: true,

    run: async(message, bot, send) => {
        send({
            embed: {
                description: '**[YouTuber // Active Virtual Addiction Member // Crionic Owner // Xenforo Designer // CEO of The Gaming Hub]()**',
                color: 0x790505
            }
        });
    }
});