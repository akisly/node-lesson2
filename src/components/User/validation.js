const Joi = require('@hapi/joi');

const schema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .regex(/^[A-Z][a-z]+(\s[A-Z][a-z]+)$/)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
});

const emailSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required()
});

const usernameSchema = Joi.object({
    username: Joi.string()
        .min(3)
        .max(30)
        .regex(/^[A-Z][a-z]+(\s[A-Z][a-z]+)$/)
        .required(),
});

module.exports = {
    /**
     * @exports
     * @method userValidator
     * @param {string} userEmail
     * @param {string} userName
     * @summary user data validation
     * @returns {object} err
     */
    async userValidator(userEmail, userName) {
        try {
            const value = await schema.validateAsync({ email: userEmail, username: userName });
        } catch (err) { 
            return err
        }
    },

    /**
     * @exports
     * @method emailValidator
     * @param {string} userEmail
     * @param {string} userName
     * @summary email validation
     * @returns {object} err
     */
    async emailValidator(userEmail) {
        try {
            const value = await emailSchema.validateAsync({ email: userEmail});
        } catch (err) { 
            return err
        }
    },

    /**
     * @exports
     * @method userNameValidator
     * @param {string} userName
     * @summary username validation
     * @returns {object} err
     */
    async usernameValidator(userName) {
        try {
            const value = await usernameSchema.validateAsync({ username: userName });
        } catch (err) { 
            return err
        }
    },
}