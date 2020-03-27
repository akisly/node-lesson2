const request = require("supertest");
const chai = require("chai");

const server = require("../../src/server/server");

const { expect } = chai;
let user;
let refreshToken;

describe("AuthComponent -> controller", () => {
    it("AuthComponent -> controller -> POST registerUser -> /v1/auth/register", done => {
        request(server)
            .post("/v1/auth/register")
            .send({
                email: "t@t.com",
                password: "12345678"
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("ok").to.be.a("boolean");
                expectBody.to.have.property("user").to.be.a("object");

                user = body.user;

                done();
            })
            .catch(err => done(err));
    });

    it("AuthComponent -> controller -> POST login -> /v1/users/login", done => {
        request(server)
            .post("/v1/auth/login")
            .send({
                email: "t@t.com",
                password: "12345678"
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("ok").to.be.a("boolean");
                expectBody.to.have.property("jwtTokens").to.be.a("object");

                refreshToken = body.jwtTokens.refreshToken;

                done();
            })
            .catch(err => done(err));
    });

    it("AuthComponent -> controller -> POST refreshTokens -> /v1/users/refresh-tokens", done => {
        request(server)
            .post("/v1/auth/refresh-tokens")
            .send({
                refreshToken
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("ok").to.be.a("boolean");
                expectBody.to.have.property("jwtTokens").to.be.a("object");

                done();
            })
            .catch(err => done(err));
    });

    it("AuthComponent -> controller -> POST logout -> /v1/users/logout", done => {
        request(server)
            .post("/v1/auth/logout")
            .send({
                refreshToken
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("ok").to.be.a("boolean");

                done();
            })
            .catch(err => done(err));
    });

    it("AuthComponent -> controller -> POST deleteUser -> /v1/auth/delete", done => {
        request(server)
            .post("/v1/auth/delete")
            .send({
                _id: user._id
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("ok").to.be.a("boolean");
                expectBody.to.have.property("data").to.be.a("object");

                done();
            })
            .catch(err => done(err));
    });
});
