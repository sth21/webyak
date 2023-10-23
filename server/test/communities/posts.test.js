/* eslint-disable no-underscore-dangle */

const request = require("supertest");

const app = require("../init-test");

const User = require("../../models/User");
const Community = require("../../models/Community");
const Post = require("../../models/Post");

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

async function makeUser() {
    const response = await request(app)
        .post("/authentication/signup")
        .type("form")
        .send("email=test@gatech.edu&password=ILoveBuzz&confirmPassword=ILoveBuzz")
        .set("Accept", "application/json");

    return response.body.token;
}

test("Does not add a post if no bearer token provided", async () => {
    const testCommunity = new Community({ name: "Test" });
    await testCommunity.save();

    const response = await request(app)
        .post(`/communities/${testCommunity._id}/posts/add`)
        .attach("image", "/Users/sam/Javascript/webyak/server/test/test.png");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(500);
}, 20000);

test("Does not add a post without text or a photo", async () => {
    const token = await makeUser();

    const testCommunity = new Community({ name: "Test" });
    await testCommunity.save();

    const response = await request(app)
        .post(`/communities/${testCommunity._id}/posts/add`)
        .set('Authorization', `Bearer ${token}`)
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(500);
}, 20000);

test("Does not allow a post to be added with a video", async () => {
    const token = await makeUser();

    const testCommunity = new Community({ name: "Test" });
    await testCommunity.save();

    const response = await request(app)
        .post(`/communities/${testCommunity._id}/posts/add`)
        .set('Authorization', `Bearer ${token}`)
        .attach("image", "/Users/sam/Javascript/webyak/server/test/test.png")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(500);
}, 20000);

test("Adds a post with just text", async () => {
    const token = await makeUser();

    const testCommunity = new Community({ name: "Test" });
    await testCommunity.save();

    const response = await request(app)
        .post(`/communities/${testCommunity._id}/posts/add`)
        .set('Authorization', `Bearer ${token}`)
        .send("text=This is my first post!")
        .set("Accept", "application/json");

    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
}, 20000);

/*

test("Adds a post with just a photo", async () => {

});

test("Adds the post to the user and the community", async () => {

});

test("Deletes a post", async () => {

});

test("Deletes the post from the user and the community", async () => {

});

test("Upvotes a post with a count of 1", async () => {

});

test("Upvotes a post with a count of -1", async () => {

});

test("Does not upvote a post given a count of 0", async () => {

});

test("Does not upvote a post given a count greater than 1", async () => {

});

test("Does not upvote a post given a count less than -1", async () => {

});

*/