const RegisterUserModel = require("./models/regusers");
const SessionsModel = require("./models/sessions");

/**
 * Register new user.
 * @param {object} user
 * @returns {Promise<RegisterUserModel>}
 */
function registerUser(user) {
    return RegisterUserModel.create(user);
}

/**
 * Create new session DB.
 * @param {object} data
 * @returns {Promise<SessionsModel>}
 */
function creareSession(data) {
    return SessionsModel.create(data);
}

/**
 * Get user from DB by email.
 * @param {String} email
 * @returns {Promise<RegisterUserModel>}
 */
function getUserByEmail(email) {
    return RegisterUserModel.findOne({ email }).exec();
}

/**
 * Delete user from DB by _id.
 * @param {String} _id
 * @returns {Promise<RegisterUserModel>}
 */
function deleteUserById(_id) {
    return RegisterUserModel.deleteOne({ _id }).exec();
}

/**
 * Get session data from DB by refresh token.
 * @param {String} refreshToken
 * @returns {Promise<SessionsModel>}
 */
function getSessionByToken(refreshToken) {
    return SessionsModel.findOne({ refreshToken }).exec();
}

/**
 * Delete session data from DB by refresh token.
 * @param {String} refreshToken
 * @returns {Promise<SessionsModel>}
 */
function deleteSessionByToken(refreshToken) {
    return SessionsModel.deleteOne({ refreshToken }).exec();
}

module.exports = {
    registerUser,
    creareSession,
    getUserByEmail,
    deleteUserById,
    getSessionByToken,
    deleteSessionByToken
};
