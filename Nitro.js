const Alias = require("./struct/Alias.js")
const ArgumentHandler = require("./struct/ArgumentHandler")
const Command = require("./struct/Command.js")
const CommandLoader = require("./struct/CommandLoader.js")
const CoolDown = require("./struct/CoolDown.js")
const logger = require("./struct/Logger.js")
const Message = require("./struct/Message.js")
const PermissionHandler = require("./struct/PermissionHandler.js")
const util = require("./struct/util.js")
const config = require("./config.js")
config.auth = require("./auth.js")

module.exports = {
    Alias,
    ArgumentHandler,
    Command,
    CommandLoader,
    CoolDown,
    logger,
    Message,
    PermissionHandler,
    util,
    config
}



