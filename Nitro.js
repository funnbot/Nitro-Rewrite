const Alias = require("./struct/Alias.js");
const ArgumentHandler = require("./struct/ArgumentHandler/index.js");
const Command = require("./struct/Command.js");
const CommandLoader = require("./struct/CommandLoader.js");
const CoolDown = require("./struct/CoolDown.js");
const Cycler = require("./struct/Cycle.js");
const NitroClient = require("./struct/NitroClient.js");
const logger = require("./struct/Logger.js");
const MessageHandler = require("./struct/MessageHandler.js");
const Image = require("./struct/ImageProcessing/Image.js");
const PermissionHandler = require("./struct/PermissionHandler.js");
const util = require("./struct/util.js");
const config = require("./config.js");
config.auth = require("./auth.js");

module.exports = {
    Alias,
    ArgumentHandler,
    Command,
    CommandLoader,
    CoolDown,
    Cycler,
    NitroClient,
    logger,
    MessageHandler,
    Image,
    PermissionHandler,
    util,
    config
}



