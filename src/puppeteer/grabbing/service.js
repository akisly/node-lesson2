const GrabbingModel = require("./model");

/**
 * @exports
 * @method addEmails
 * @param {object} emails
 * @summary add a new grabbing emails
 * @returns Promise<GrabbingModel[]>
 */
async function addEmails(emails) {
    return await GrabbingModel.create(emails);
}

module.exports = {
    addEmails
};
