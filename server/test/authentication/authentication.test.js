const request = require("supertest");

const app = require("../init-test");

const User = require("../../models/User");

test("Logs user in with proper credentials", async (done) => {
    await User.create({ email: "test@gatech.edu", password: "ILoveBuzz" });

    request(app)
        .post("authentication/login")
        .send({ email: "test@gatech.edu", password: "ILoveBuzz" })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect((res) => res.body.should.have.property("token"))
        .expect(200)
        .end(done);
});

test("Does not log user in with improper credentials", (done) => {

});

test("Signs user up", (done) => {

});

test("Deletes user account", (done) => {

});

test("Decrements the communities the deleted user was a part of", (done) => {

});