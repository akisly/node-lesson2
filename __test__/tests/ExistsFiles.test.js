const chai = require("chai");
const path = require("path");

// expect path
chai.use(require("chai-fs"));

const { expect } = chai;

describe("EXIST FILES", () => {
    it("CodeStyle", done => {
        expect(path.join(__dirname, "../../.eslintrc")).to.be.a.path();

        done();
    });

    it("Nodemon", done => {
        expect(path.join(__dirname, "../../nodemon.json")).to.be.a.path();

        done();
    });

    it("Gitignore", done => {
        expect(path.join(__dirname, "../../.gitignore")).to.be.a.path();

        done();
    });

    it("Readme", done => {
        expect(path.join(__dirname, "../../README.MD")).to.be.a.path();

        done();
    });

    it("Components -> User", done => {
        expect(
            path.join(__dirname, "../../src/components/User/index.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/components/User/model.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/components/User/router.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/components/User/service.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/components/User/validation.js")
        ).to.be.a.path();

        done();
    });

    it("Components -> Auth", done => {
        expect(
            path.join(__dirname, "../../src/components/Auth/index.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/components/Auth/models/regusers.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/components/Auth/models/sessions.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/components/Auth/router.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/components/Auth/service.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/components/Auth/validation.js")
        ).to.be.a.path();

        done();
    });

    it("Config", done => {
        expect(
            path.join(__dirname, "../../src/config/connection.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/config/middleware.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/config/router.js")
        ).to.be.a.path();

        done();
    });

    it("Error", done => {
        expect(
            path.join(__dirname, "../../src/error/ValidationError.js")
        ).to.be.a.path();

        done();
    });

    it("Server", done => {
        expect(
            path.join(__dirname, "../../src/server/server.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/server/index.js")
        ).to.be.a.path();
        expect(
            path.join(__dirname, "../../src/server/events.js")
        ).to.be.a.path();

        done();
    });
});
