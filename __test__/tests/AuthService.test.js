require("dotenv").config();
const chai = require("chai");
const AuthService = require("../../src/components/Auth/service");

const { expect } = chai;
let user;

describe("AuthComponent -> service", () => {
    it("AuthComponent -> service -> registerUser", done => {
        AuthService.registerUser({
            email: "test11@gmail.com",
            password: "test11"
        })
            .then(data => {
                expect(data).to.be.a("object");

                user = data;

                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("AuthComponent -> service -> creareSession", done => {
        AuthService.creareSession({
            userId: user._id,
            refreshToken: "refreshToken",
            "user-agent": "user-agent",
            expiresIn: new Date().expiresIn(process.env.REFRESH_TOKEN_LIFE),
            createdAt: Date.now()
        })
            .then(data => {
                const result = expect(data);
                result.to.be.a("object");

                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("AuthComponent -> service -> getUserByEmail", done => {
        AuthService.getUserByEmail(user.email)
            .then(data => {
                const result = expect(data);
                result.to.be.a("object");
                result.to.have.property("_id").to.be.a("object");
                result.to.have.property("email").to.be.a("string");
                result.to.have.property("password").to.be.a("string");

                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("AuthComponent -> service -> getSessionByToken", done => {
        AuthService.getSessionByToken("refreshToken")
            .then(data => {
                const result = expect(data);
                result.to.be.a("object");

                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("AuthComponent -> service -> deleteSessionByToken", done => {
        AuthService.deleteSessionByToken("refreshToken")
            .then(data => {
                const result = expect(data);
                result.to.be.a("object");

                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("AuthComponent -> service -> deleteUserById", done => {
        AuthService.deleteUserById({
            _id: user._id
        })
            .then(data => {
                const result = expect(data);
                result.to.be.a("object");
                result.to.have.property("deletedCount").equal(1);

                done();
            })
            .catch(error => {
                done(error);
            });
    });
});
