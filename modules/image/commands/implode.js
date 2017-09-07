const Nitro = require("../../../Nitro.js")
const Image = Nitro.Image

module.exports = new Nitro.Command({
    help: "",
    example: "",
    args: [
        {
            prompt: "Implode factor?",
            optional: true,
            type: "string"
        }
    ],

    run: async(message, bot, send) => {
        const factor = Nitro.util.parseNum(message.args[0], 0, 3, .5);
        const url = await message.fetchImage(true);
        const image = new Image(Image.readUrl(url));
        image.gm.implode(factor);
        image.send(send);
    }
})