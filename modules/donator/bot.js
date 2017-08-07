const Client = require("../../struct/Client.js");
const client = new Client("tag");

module.exports = client.bot;

client.login();