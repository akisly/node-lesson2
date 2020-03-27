const { Router } = require("express");
const UserComponent = require("../User");

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();
const viewRouter = Router();

/**
 * Renders user page to URL request /users.
 * @name /users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
viewRouter.get("/", UserComponent.usersPage);

/**
 * Renders user page with popup-create.
 * @name /users/create
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
viewRouter.post("/create", UserComponent.popupCreate);

/**
 * Renders user page with popup-update.
 * @name /users/update
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
viewRouter.post("/update", UserComponent.popupUpdate);

/**
 * Route serving list of users.
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/", UserComponent.findAll);

/**
 * Route serving a user
 * @name /v1/users/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get("/:id", UserComponent.findById);

/**
 * Route serving a new user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post("/", UserComponent.createUser);

/**
 * Route serving a new user
 * @name /v1/users/create
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post("/create", UserComponent.create);

/**
 * Route serving a update user
 * @name /v1/users/update
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post("/update", UserComponent.updateById);

/**
 * Route serving a delete user
 * @name /v1/users/update
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post("/delete", UserComponent.deleteById);

/**
 * Route serving a update user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.put("/", UserComponent.updateByIdAPI);

/**
 * Route serving a delete user
 * @name /v1/users
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.delete("/", UserComponent.deleteByIdAPI);

module.exports = {
    router,
    viewRouter
};
