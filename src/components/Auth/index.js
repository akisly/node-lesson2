const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AuthService = require("./service");
const AuthValidation = require("./validation");
const ValidationError = require("../../error/ValidationError");

/**
 * Generate and return JWT tokens.
 * @param {object} data
 */
async function generateJWTTokens(data) {
    const accessToken = jwt.sign({ data }, process.env.ACCESS_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
    });
    const refreshToken = jwt.sign({ data }, process.env.REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_LIFE
    });

    return {
        accessToken,
        refreshToken
    };
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function registerUser(req, res, next) {
    try {
        const { error } = AuthValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        req.body.password = bcrypt.hashSync(req.body.password, 8);

        const user = await AuthService.registerUser(req.body);

        return res.status(200).json({ ok: true, user });
    } catch (error) {
        if (error instanceof ValidationError || error.name === "MongoError") {
            return res.status(422).json({
                message: error.name,
                details: error.message
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function deleteUser(req, res, next) {
    try {
        const { error } = AuthValidation.deleteById(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const data = await AuthService.deleteUserById(req.body._id);

        return res.status(200).json({ ok: true, data });
    } catch (error) {
        if (error instanceof ValidationError || error.name === "MongoError") {
            return res.status(422).json({
                message: error.name,
                details: error.message
            });
        }

        res.status(500).json({
            message: error.name,
            details: error.message
        });

        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function login(req, res, next) {
    try {
        const { error } = AuthValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const user = await AuthService.getUserByEmail(req.body.email);

        if (!user) {
            return res.status(404).json({
                error: "User don't found"
            });
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res
                .status(401)
                .json({ ok: false, jwtTokens: null, user: null });
        }

        const jwtTokens = await generateJWTTokens(user._id);
        const session = await AuthService.creareSession({
            userId: user._id,
            refreshToken: jwtTokens.refreshToken,
            "user-agent": req["user-agent"],
            expiresIn: new Date().expiresIn(process.env.REFRESH_TOKEN_LIFE),
            createdAt: Date.now()
        });

        return res.status(200).json({ ok: true, jwtTokens });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message
            });
        }
        return next(error);
    }
}

/**
 * @function
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function logout(req, res, next) {
    try {
        const { error } = AuthValidation.refreshToken(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const oldSession = await AuthService.getSessionByToken(
            req.body.refreshToken
        );

        if (!oldSession) {
            return res.status(404).json({
                error: "Session not found"
            });
        }

        await AuthService.deleteSessionByToken(req.body.refreshToken);

        return res.status(200).json({ ok: true });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message
            });
        }
        return next(error);
    }
}

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise<void>}
 */
async function refreshTokens(req, res, next) {
    try {
        const { error } = AuthValidation.refreshToken(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const oldSession = await AuthService.getSessionByToken(
            req.body.refreshToken
        );

        if (!oldSession) {
            return res.status(404).json({
                error: "Session not found"
            });
        }

        await AuthService.deleteSessionByToken(req.body.refreshToken);

        if (Date.now() - oldSession.expiresIn > 0) {
            return res.status(404).json({
                error: "TOKEN_EXPIRED"
            });
        }

        const jwtTokens = await generateJWTTokens(oldSession.userId);
        const newSession = await AuthService.creareSession({
            userId: oldSession._id,
            refreshToken: jwtTokens.refreshToken,
            "user-agent": req["user-agent"],
            expiresIn: new Date().expiresIn(process.env.REFRESH_TOKEN_LIFE),
            createdAt: Date.now()
        });

        return res.status(200).json({ ok: true, jwtTokens });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                message: error.name,
                details: error.message
            });
        }
        return next(error);
    }
}

Date.prototype.expiresIn = function(data) {
    if (data.indexOf("d")) {
        this.setDate(
            this.getDate() + parseInt(data.substr(0, data.length - 1))
        );
    } else if (data.indexOf("h")) {
        this.setHours(
            this.getHours() + parseInt(data.substr(0, data.length - 1))
        );
    }

    return this;
};

module.exports = {
    registerUser,
    deleteUser,
    login,
    logout,
    refreshTokens
};
