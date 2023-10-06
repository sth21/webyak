const { test } = require("jest");

const comments = require("../../controllers/communities/comments");

test("Adds a comment with just a photo");

test("Adds the comment to the user and to the post")

test("Deletes a comment");

test("Deletes the comment from the user and the post");

test("Upvotes a comment with a count of 1");

test("Upvotes a comment with a count of -1");

test("Does not upvote a comment given a count of 0");

test("Does not upvote a comment given a count greater than 1");

test("Does not upvote a comment given a count less than -1");

