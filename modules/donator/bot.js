const Nitro = require('../../Nitro.js');
const Client = require("../../struct/Client.js");
const client = new Client("tag");

client.database();
Nitro.Message(client.bot);

module.exports = client.bot;

client.login();