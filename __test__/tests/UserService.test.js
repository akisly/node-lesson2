require("dotenv").config();
const chai = require("chai");
const UserService = require("../../src/components/User/service");

const { expect } = chai;
let user;

describe("UserComponent -> service", () => {
    it("UserComponent -> service -> findAll", done => {
        UserService.findAll()
            .then(result => {
                expect(result).to.be.a("array");

                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("UserComponent -> service -> create", done => {
        UserService.create({
            email: "g@g.com",
            fullName: "T T"
        })
            .then(data => {
                const result = expect(data);
                result.to.be.a("object");
                result.to.have.property("_id").to.be.a("object");
                result.to.have.property("email").to.be.a("string");
                result.to.have.property("fullName").to.be.a("string");
                user = data;

                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("UserComponent -> service -> findById", done => {
        UserService.findById(user._id)
            .then(data => {
                const result = expect(data);
                result.to.be.a("object");
                result.to.have.property("_id").to.be.a("object");
                result.to.have.property("email").to.be.a("string");
                result.to.have.property("fullName").to.be.a("string");

                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("UserComponent -> service -> updateById", done => {
        UserService.updateById(user._id, { fullName: "Test Test" })
            .then(data => {
                const result = expect(data);
                result.to.be.a("object");
                result.to.have.property("nModified").equal(1);
                result.to.have.property("ok").equal(1);

                done();
            })
            .catch(error => {
                done(error);
            });
    });

    it("UserComponent -> service -> deleteById", done => {
        UserService.deleteById(user._id)
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
