const Validation = require("../validation");

class AuthValidation extends Validation {
    /**
     * @param {String} data.email
     * @param {String} data.password
     * @returns
     * @memberof AuthValidation
     */
    create(data) {
        return this.Joi.object({
            email: this.Joi.string()
                .email()
                .required(),
            password: this.Joi.string()
                .min(1)
                .required()
        }).validate(data);
    }

    /**
     * @param {String} data.email
     * @param {String} data.password
     * @returns
     * @memberof AuthValidation
     */
    login(data) {
        return this.Joi.object({
            email: this.Joi.string()
                .email()
                .required(),
            password: this.Joi.string()
                .min(1)
                .required()
        }).validate(data);
    }

    /**
     * @param {String} data.refreshToken
     * @returns
     * @memberof AuthValidation
     */
    refreshToken(data) {
        return this.Joi.object({
            refreshToken: this.Joi.string().required()
        }).validate(data);
    }

    /**
     * @param {String} data._id - objectId
     * @returns
     * @memberof AuthValidation
     */
    deleteById(data) {
        return this.Joi.object({
            _id: this.Joi.objectId()
        }).validate(data);
    }
}

module.exports = new AuthValidation();
