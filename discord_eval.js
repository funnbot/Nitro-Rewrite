(function implantEval(window, d) {
    const localStorage = d.body.appendChild(d.createElement("iframe")).contentWindow.localStorage;
    const regex = new RegExp(JSON.parse(localStorage.token).split(".").join("|"), "g");

    window.addEventListener("keydown", handleDown);

    console.log("Evaler Loaded")

    function handleDown(event) {
        if (!event.getModifierState("Alt")) return;
        if (event.keyCode !== 13) return;
        const textArea = document.querySelector("textarea");
        if (!textArea || !textArea.value) return;
        sendMessage(resolveChannelID(), processEval(textArea.value));
        textArea.value = "";
        return;
    }

    function processEval(code) {
        try {
            var evaled = eval(code);
        } catch (e) {
            var evaled = e;
        }
        if (!evaled) return evaled + "";
        return (evaled + "").replace(regex, "[SECRET]");
    }

    function sendMessage(channelID, content) {
        var url = `https://discordapp.com/api/v7/channels/${channelID}/messages`;
        var opts = {
            method: "POST",
            headers: {
                Authorization: JSON.parse(localStorage.token),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content }),
        }
        return fetch(url, opts).catch(console.error);
    }

    function resolveChannelID() {
        const path = window.location.pathname;
        return path.slice(path.lastIndexOf("/") + 1, path.length);
    }

}(window, document));