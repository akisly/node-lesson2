const { Router } = require("express");
const AuthComponent = require("../Auth");

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving a register user.
 * @name /v1/auth/register
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/register", AuthComponent.registerUser);

/**
 * Route serving a delete user.
 * @name /v1/auth/register
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/delete", AuthComponent.deleteUser);

/**
 * Route serving a login user.
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/login", AuthComponent.login);

/**
 * Route serving a logout user.
 * @name /v1/auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post("/logout", AuthComponent.logout);

/**
 * Route serving a refresh token.
 * @name /v1/auth/refresh-tokens
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post("/refresh-tokens", AuthComponent.refreshTokens);

module.exports = {
    router
};
