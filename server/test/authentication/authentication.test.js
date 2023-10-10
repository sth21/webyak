const request = require("supertest");

const app = require("../init-test");

const User = require("../../models/User");

const { connectDB, disconnectDB, disconnectCollections } = require("../init-test-db");

beforeAll(async () => {
    await connectDB();
});

afterAll(async () => {
    await disconnectDB();
});

afterEach(async () => {
    await disconnectCollections();
});

test("Logs user in with proper credentials", async () => {
    const testUser = new User({ email: "test@gatech.edu", password: "$2a$16$LltN0KH9WMLZtuDdjQIm0.VQo5fmjE3qZt76q7Zyj7Z0r4IHE9tN6" });
    await testUser.save();

    const response = await request(app)
        .post("/authentication/login")
        .type("form")
        .send("email=test@gatech.edu&password=ILoveBuzz")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).not.toBeUndefined();
    expect(response.status).toBe(200);

}, 20000);

test("Signs user up", async () => {
    const response = await request(app)
        .post("/authentication/signup")
        .type("form")
        .send("email=test@gatech.edu&password=ILoveBuzz&confirmPassword=ILoveBuzz")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).not.toBeUndefined();
    expect(response.status).toBe(200);
});

/*

test("Does not log user in with improper credentials", (done) => {

});

test("Deletes user account", (done) => {

});

test("Decrements the communities the deleted user was a part of", (done) => {

});

*/