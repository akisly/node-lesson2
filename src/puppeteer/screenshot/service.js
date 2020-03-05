const ScreebshotModel = require("./model");

/**
 * @exports
 * @method addEmails
 * @param {object} link
 * @summary add a shared link on image
 * @returns Promise<UserModel[]>
 */
async function addLink(link) {
    return await ScreebshotModel.create(link);
}

module.exports = {
    addLink
};
