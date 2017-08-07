module.exports = Regex = {
    user: {
        name: /^.{2,32}$/g,
        namedisc: /^.{2,32}#[0-9]{0,4}$/g,
        mention: /^<@!?[0-9]{17,19}>$/g
    },
    channel: {
        name: /^[a-z_-]{2,100}$/g,
        mention: /^<#[0-9]{17,19}>$/g
    },
    role: {
        name: /^.{1,100}$/g,
        mention: /^<@&[0-9]{17,19}>$/g
    },
    id: /^[0-9]{17,19}$/g
}
