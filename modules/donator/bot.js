const Nitro = require('../../Nitro.js');
const Client = require("../../struct/Client.js");
const client = new Client("tag");
client.database();
module.exports = client.bot;
new Nitro.Message(client.bot);
client.login();
