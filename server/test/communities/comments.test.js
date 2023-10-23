const request = require("supertest");

const app = require("../init-test");

const User = require("../../models/User");
const Community = require("../../models/Community");
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");

/*
test("Does not allow a comment to be added without a photo or text", () => {

});

test("Does not allow a comment to be added with a video");

test("Adds a comment with just a photo");

test("Adds a comment with just text");

test("Adds the comment to the user and to the post");

test("Deletes a comment");

test("Deletes the comment from the user and the post");

test("Upvotes a comment with a count of 1");

test("Upvotes a comment with a count of -1");

test("Does not upvote a comment given a count of 0");

test("Does not upvote a comment given a count greater than 1");

test("Does not upvote a comment given a count less than -1");

*/
