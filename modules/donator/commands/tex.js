const Nitro = require("../../../Nitro.js");

module.exports = new Nitro.Command({
	help: 'A daily dose of awesome.',
	example: '${p}FDA',

	run: (message, bot, send) => {
		send({files: ['http://oi53.tinypic.com/qyv588.gif']});
	}
});
