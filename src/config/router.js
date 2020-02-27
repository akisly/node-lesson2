const express = require('express');
const http = require('http');
const UserService = require('../components/User/service');
const UserRouter = require('../components/User/router');

module.exports = {
    /**
     * @function
     * @param {express.Application} app
     * @summary init Application router
     * @returns void
     */
    init(app) {
        const router = express.Router();
    
        /**
         * Renders user page to URL request /users.
         * @name /users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.get('/users', async (req, res, next) => {
            try {
                const users = await UserService.findAll();

                res.render('users', {users: users, popup: null});
            } catch (error) {
                res.render('users', {users: null, popup: null});

                next(error);
            }
        });

        /**
         * Renders user page with popup-create.
         * @name /users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.post('/users/create', async (req, res, next) => {
            try {
                const users = await UserService.findAll();

                res.render('users', {users: users, popup: 'create'});
            } catch (error) {
                res.render('users', {users: null, popup: null});

                next(error);
            }
        });

        /**
         * Renders user page with popup-update.
         * @name /users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.post('/users/update', async (req, res, next) => {
            try {
                const users = await UserService.findAll();

                res.render('users', {users: users, popup: 'update', id: req.body.id});
            } catch (error) {
                res.render('users', {users: null, popup: null});

                next(error);
            }
        });

        /**
         * Forwards any requests to the /v1/users URI to UserRouter.
         * @name /v1/users
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        app.use('/v1/users', UserRouter);
    
        /** 
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        app.use((req, res, next) => {
            res.status(404).send(http.STATUS_CODES[404]);
        });
    
        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        app.use(router);
    }
};