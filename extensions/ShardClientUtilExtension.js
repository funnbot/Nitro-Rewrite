const Extension = require("./Extension.js");

class ShardClientUtilExtension extends Extension {
    async clientValuesReduced(prop) {
        try {
            const values = await this.fetchClientValues(prop);
            return values.reduce((a, b) => a + b, 0);
        } catch (e) {
            return null;
        }
    }
}

module.exports = ShardClientUtilExtension;