/* eslint-disable no-underscore-dangle */

const request = require("supertest");

const app = require("../init-test");

const User = require("../../models/User");
const Community = require("../../models/Community");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

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

async function makeCommunity() {
    const testCommunity = new Community({ name: "Test" });
    await testCommunity.save();
    return testCommunity._id;
}

async function makePost(userToken, communityId) {
    const createResponse = await request(app)
        .post(`/communities/${communityId}/posts/add`)
        .set('Authorization', `Bearer ${userToken}`)
        .attach("photo", "/Users/sam/Javascript/webyak/server/test/test.png")
        .field("test", "This is my first post!")
        .set("Accept", "application/json");

    expect(createResponse.headers["content-type"]).toMatch(/json/);
    expect(createResponse.status).toBe(200);

    const post = await Post.findOne();
    
    return post._id;
}

test("Does not allow a comment to be added without a photo or text", async () => {
    const token = await makeUser();
    const communityId = await makeCommunity();
    const postId = await makePost(token, communityId);

    const commentResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/add`)
        .set('Authorization', `Bearer ${token}`);

    expect(commentResponse.headers["content-type"]).toMatch(/json/);
    expect(commentResponse.status).toBe(500);

}, 20000);

test("Does not allow a comment to be added with a video", async () => {
    const token = await makeUser();
    const communityId = await makeCommunity();
    const postId = await makePost(token, communityId);

    const commentResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/add`)
        .set('Authorization', `Bearer ${token}`)
        .attach("photo", "/Users/sam/Javascript/webyak/server/test/test.mp4");

    const comment = await Comment.findOne();
    expect(comment).toBe(null);  

    expect(commentResponse.headers["content-type"]).toMatch(/json/);
    expect(commentResponse.status).toBe(500);

    const post = await Post.findById(postId);
    expect(post.comments.length).toBe(0);

    const user = await User.findOne();
    expect(user.comments.length).toBe(0);
    
}, 20000);

test("Allow a comment to be added with just text", async () => {
    const token = await makeUser();
    const communityId = await makeCommunity();
    const postId = await makePost(token, communityId);

    const commentResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/add`)
        .set('Authorization', `Bearer ${token}`)
        .send("text=This is my first post!");

    expect(commentResponse.headers["content-type"]).toMatch(/json/);
    expect(commentResponse.status).toBe(200);
    
    const comment = await Comment.findOne();
    expect(comment).not.toBe(null);

    const post = await Post.findById(postId);
    expect(post.comments.length).toBe(1);

    const user = await User.findOne();
    expect(user.comments.length).toBe(1);

}, 20000);

test("Allow a comment to be added with just a photo", async () => {
    const token = await makeUser();
    const communityId = await makeCommunity();
    const postId = await makePost(token, communityId);

    const commentResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/add`)
        .set('Authorization', `Bearer ${token}`)
        .attach("photo", "/Users/sam/Javascript/webyak/server/test/test.png");

    expect(commentResponse.headers["content-type"]).toMatch(/json/);
    expect(commentResponse.status).toBe(200);
    
    const comment = await Comment.findOne();
    expect(comment).not.toBe(null);

    const post = await Post.findById(postId);
    expect(post.comments.length).toBe(1);

    const user = await User.findOne();
    expect(user.comments.length).toBe(1);
    
}, 20000);

test("Deletes a comment", async () => {
    const token = await makeUser();
    const communityId = await makeCommunity();
    const postId = await makePost(token, communityId);

    const commentResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/add`)
        .set('Authorization', `Bearer ${token}`)
        .attach("photo", "/Users/sam/Javascript/webyak/server/test/test.png");

    expect(commentResponse.headers["content-type"]).toMatch(/json/);
    expect(commentResponse.status).toBe(200);

    const comment = await Comment.findOne();
    
    const deleteResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/delete/${comment._id}`)
        .set('Authorization', `Bearer ${token}`);

    expect(deleteResponse.headers["content-type"]).toMatch(/json/);
    expect(deleteResponse.status).toBe(200);

    const commentAfter = await Comment.findOne();
    expect(commentAfter).toBe(null);

    const user = await User.findOne();
    expect(user.comments.length).toBe(0);

    const post = await Post.findOne();
    expect(post.comments.length).toBe(0);
    
}, 20000);

test("Upvote a comment", async () => {
    const token = await makeUser();
    const communityId = await makeCommunity();
    const postId = await makePost(token, communityId);

    const commentResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/add`)
        .set('Authorization', `Bearer ${token}`)
        .attach("photo", "/Users/sam/Javascript/webyak/server/test/test.png");

    expect(commentResponse.headers["content-type"]).toMatch(/json/);
    expect(commentResponse.status).toBe(200);

    const comment = await Comment.findOne();

    const upvoteResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/upvote/${comment._id}`)
        .query({ count: 1 })
        .set('Authorization', `Bearer ${token}`);

    expect(upvoteResponse.headers["content-type"]).toMatch(/json/);
    expect(upvoteResponse.status).toBe(200);

    const commentAfter = await Comment.findOne();
    expect(commentAfter.upVotes).toBe(1);
    
}, 20000);

test("Downvote a comment", async () => {
    const token = await makeUser();
    const communityId = await makeCommunity();
    const postId = await makePost(token, communityId);

    const commentResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/add`)
        .set('Authorization', `Bearer ${token}`)
        .attach("photo", "/Users/sam/Javascript/webyak/server/test/test.png");

    expect(commentResponse.headers["content-type"]).toMatch(/json/);
    expect(commentResponse.status).toBe(200);

    const comment = await Comment.findOne();

    const upvoteResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/upvote/${comment._id}`)
        .query({ count: -1 })
        .set('Authorization', `Bearer ${token}`);

    expect(upvoteResponse.headers["content-type"]).toMatch(/json/);
    expect(upvoteResponse.status).toBe(200);

    const commentAfter = await Comment.findOne();
    expect(commentAfter.upVotes).toBe(-1);
    
}, 20000);

test("Fails to change upvotes on a comment when not -1 or 1", async () => {
    const token = await makeUser();
    const communityId = await makeCommunity();
    const postId = await makePost(token, communityId);

    const commentResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/add`)
        .set('Authorization', `Bearer ${token}`)
        .attach("photo", "/Users/sam/Javascript/webyak/server/test/test.png");

    expect(commentResponse.headers["content-type"]).toMatch(/json/);
    expect(commentResponse.status).toBe(200);

    const comment = await Comment.findOne();

    const upvoteResponse = await request(app)
        .post(`/communities/${communityId}/posts/${postId}/comments/upvote/${comment._id}`)
        .query({ count: 2 })
        .set('Authorization', `Bearer ${token}`);

    expect(upvoteResponse.headers["content-type"]).toMatch(/json/);
    expect(upvoteResponse.status).toBe(500);

    const commentAfter = await Comment.findOne();
    expect(commentAfter.upVotes).toBe(0);
    
}, 20000);
