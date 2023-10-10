/* eslint-disable no-underscore-dangle */

const request = require("supertest");

const app = require("../init-test");

const User = require("../../models/User");
const Community = require("../../models/Community");

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

test("Does not log in user if an email isn't provided", async () => {
    const testUser = new User({ email: "test@gatech.edu", password: "$2a$16$LltN0KH9WMLZtuDdjQIm0.VQo5fmjE3qZt76q7Zyj7Z0r4IHE9tN6" });
    await testUser.save();

    const response = await request(app)
        .post("/authentication/login")
        .type("form")
        .send("password=ILoveBuzz")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeUndefined();
    expect(response.body.msg).toBe("Unable to login");
    expect(response.status).toBe(500);

}, 20000);

test("Does not log in user if a password isn't provided", async () => {
    const testUser = new User({ email: "test@gatech.edu", password: "$2a$16$LltN0KH9WMLZtuDdjQIm0.VQo5fmjE3qZt76q7Zyj7Z0r4IHE9tN6" });
    await testUser.save();

    const response = await request(app)
        .post("/authentication/login")
        .type("form")
        .send("email=test@gatech.edu")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeUndefined();
    expect(response.body.msg).toBe("Unable to login");
    expect(response.status).toBe(500);

}, 20000);

test("Does not log user in with improper password", async () => {
    const testUser = new User({ email: "test@gatech.edu", password: "$2a$16$LltN0KH9WMLZtuDdjQIm0.VQo5fmjE3qZt76q7Zyj7Z0r4IHE9tN6" });
    await testUser.save();

    const response = await request(app)
        .post("/authentication/login")
        .type("form")
        .send("email=test@gatech.edu&password=ILoveMyBulldogs")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeUndefined();
    expect(response.body.msg).toBe("Incorrect password")
    expect(response.status).toBe(401);
}, 20000);

test("Does not log user in with improper email", async () => {
    const testUser = new User({ email: "test@gatech.edu", password: "$2a$16$LltN0KH9WMLZtuDdjQIm0.VQo5fmjE3qZt76q7Zyj7Z0r4IHE9tN6" });
    await testUser.save();

    const response = await request(app)
        .post("/authentication/login")
        .type("form")
        .send("email=test@uga.edu&password=ILoveBuzz")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeUndefined();
    expect(response.body.msg).toBe("No account registered with provided email")
    expect(response.status).toBe(401);
}, 20000);

test("Does not log user in with improper everything", async () => {
    const testUser = new User({ email: "test@gatech.edu", password: "$2a$16$LltN0KH9WMLZtuDdjQIm0.VQo5fmjE3qZt76q7Zyj7Z0r4IHE9tN6" });
    await testUser.save();

    const response = await request(app)
        .post("/authentication/login")
        .type("form")
        .send("email=test@uga.edu&password=ILoveMuBulldogs")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeUndefined();
    expect(response.body.msg).toBe("No account registered with provided email")
    expect(response.status).toBe(401);
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
}, 20000);

test("Does not sign user up when not provided an email", async () => {
    const response = await request(app)
        .post("/authentication/signup")
        .type("form")
        .send("password=ILoveBuzz&confirmPassword=ILoveBuzz")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeUndefined();
    expect(response.body.msg).toBe("Unable to sign up");
    expect(response.status).toBe(500);
}, 20000);

test("Does not sign user up when not provided a password", async () => {
    const response = await request(app)
        .post("/authentication/signup")
        .type("form")
        .send("email=test@gatech.edu")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeUndefined();
    expect(response.body.msg).toBe("Unable to sign up");
    expect(response.status).toBe(500);
}, 20000);

test("Does not sign user up when not password does not equal confirm password", async () => {
    const response = await request(app)
        .post("/authentication/signup")
        .type("form")
        .send("email=test@gatech.edu&password=ILoveBuzz&confirmPassword=ILoveMyBulldogs")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.token).toBeUndefined();
    expect(response.body.msg).toBe("Unable to sign up");
    expect(response.status).toBe(500);
}, 20000);

test("Deletes user account when given bearer token", async () => {
    const testUser = new User({ email: "test@gatech.edu", password: "$2a$16$LltN0KH9WMLZtuDdjQIm0.VQo5fmjE3qZt76q7Zyj7Z0r4IHE9tN6" });
    await testUser.save();

    const loginResponse = await request(app)
        .post("/authentication/login")
        .type("form")
        .send("email=test@gatech.edu&password=ILoveBuzz")
        .set("Accept", "application/json");

    const { token } = loginResponse.body;

    const deleteResponse = await request(app)
        .get("/authentication/delete-account")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json");

    expect(deleteResponse.headers["content-type"]).toMatch(/json/);
    expect(deleteResponse.body.msg).toBe("Successfully deleted account");
    expect(deleteResponse.status).toBe(200);

    const deletedUser = await User.findById(testUser._id);
    expect(deletedUser).toBeNull();
}, 20000);

test("Does not delete user account if no bearer token provided", async () => {
    const response = await request(app)
        .get("/authentication/delete-account")
        .set("Accept", "application/json");

    expect(response.status).toBe(401);
}, 20000);

test("Decrements membership of communities upon deletion", async () => {
    const testUser = new User({ email: "test@gatech.edu", password: "$2a$16$LltN0KH9WMLZtuDdjQIm0.VQo5fmjE3qZt76q7Zyj7Z0r4IHE9tN6" });
    await testUser.save();

    const communityA = new Community({ name: "Community A", members: 876 });
    const communityB = new Community({ name: "Community B", members: 1 });

    await communityA.save();
    await communityB.save();

    testUser.communities.set(communityA._id, 0);
    testUser.communities.set(communityB._id, 0);

    await testUser.save();

        const loginResponse = await request(app)
        .post("/authentication/login")
        .type("form")
        .send("email=test@gatech.edu&password=ILoveBuzz")
        .set("Accept", "application/json");

    const { token } = loginResponse.body;

    await request(app)
        .get("/authentication/delete-account")
        .set("Authorization", `Bearer ${token}`)
        .set("Accept", "application/json");

    const updatedCommunityA = await Community.findById(communityA._id);
    const updatedCommunityB = await Community.findById(communityB._id);

    expect(updatedCommunityA.members).toBe(875);
    expect(updatedCommunityB.members).toBe(0);

}, 20000);