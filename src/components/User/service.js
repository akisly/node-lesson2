const UserModel = require('./model');

module.exports = {
    /**
     * @exports
     * @method findAll
     * @param {}
     * @summary get list of all users
     * @returns Promise<UserModel[]>
     */
    async findAll() {
        return await UserModel.find({});
    },

    /**
     * @exports
     * @method findUser
     * @param {string} userEmail
     * @summary get user
     * @returns Promise<UserModel[]>
     */
    async findUser(userEmail) {
        return await UserModel.find({email: userEmail});
    },

    /**
     * @exports
     * @method createUser
     * @param {string} userEmail
     * @param {string} userName
     * @summary create user
     * @returns Promise<UserModel[]>
     */
    async createUser(userEmail, userName) {
        let newUser = new UserModel({email: userEmail, fullName: userName});
        newUser.save((err) => {
            if (err) return console.error(err);
        });
        return newUser;
    },

    /**
     * @exports
     * @method updateUser
     * @param {string} userEmail
     * @param {string} userName
     * @summary update user
     * @returns Promise<UserModel[]>
     */
    async updateUser(userEmail, userName) {
        return await UserModel.findOneAndUpdate({email: userEmail}, {fullName: userName}, {
            new: true
        }, (err) => {
            if (err) return console.error(err);
        });
    },

    /**
     * @exports
     * @method deleteUser
     * @param {string} userEmail
     * @summary delete user
     * @returns Promise<UserModel[]>
     */
    async deleteUser(userEmail) {
        return await UserModel.deleteOne({email: userEmail}, (err) => {
            if (err) return console.error(err);
        });
    }
};
