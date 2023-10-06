const { test } = require("jest");

const posts = require("../../controllers/communities/posts");

test("Does not add a post without text or a photo");

test("Adds a post with just a text");

test("Adds a post with just a photo");

test("Adds the post to the user and the community");

test("Deletes a post");

test("Deletes the post from the user and the community");

test("Upvotes a post with a count of 1");

test("Upvotes a post with a count of -1");

test("Does not upvote a post given a count of 0");

test("Does not upvote a post given a count greater than 1");

test("Does not upvote a post given a count less than -1");