const request = require("supertest");
const chai = require("chai");

const server = require("../../src/server/server");

const { expect } = chai;
let user;

describe("UserComponent -> controller", () => {
    it("UserComponent -> controller -> GET findAll -> /v1/users/", done => {
        request(server)
            .get("/v1/users")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("data").and.to.be.a("array");

                done();
            })
            .catch(err => done(err));
    });

    it("UserComponent -> controller -> POST create -> /v1/users/", done => {
        request(server)
            .post("/v1/users/")
            .send({
                email: "t@t.com",
                fullName: "Tom Bar"
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("data").and.to.be.a("object");
                user = body.data;

                done();
            })
            .catch(err => done(err));
    });

    it("UserComponent -> controller -> GET findById -> /v1/users/", done => {
        request(server)
            .get(`/v1/users/${user._id}`)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("data").and.to.be.a("object");

                done();
            })
            .catch(err => done(err));
    });

    it("UserComponent -> controller -> PUT updateById -> /v1/users/", done => {
        request(server)
            .put("/v1/users/")
            .send({
                id: user._id,
                fullName: "Alex G"
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("data").and.to.be.a("object");

                done();
            })
            .catch(err => done(err));
    });

    it("UserComponent -> controller -> DELETE deleteById -> /v1/users/", done => {
        request(server)
            .delete("/v1/users/")
            .send({
                id: user._id
            })
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200)
            .then(({ body }) => {
                const expectBody = expect(body);

                expectBody.to.have.property("data").and.to.be.a("object");

                done();
            })
            .catch(err => done(err));
    });
});
