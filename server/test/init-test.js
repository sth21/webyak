// Middleware
const express = require('express');
const logger = require('morgan');
const passport = require('passport');
const Strategy = require('../strategy');

// Init JWT Strategy
passport.use(Strategy);

// Import Routers
const AuthRouter = require("../routes/authentication/authentication");
const UserRouter = require("../routes/user/user");
const CommunitiesRouter = require("../routes/communities/communities");

const app = express();

// Set up middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

// Set up routers
app.use('/authentication', AuthRouter);
app.use('/user', UserRouter);
app.use('/communities', CommunitiesRouter);

// Error handler
app.use((err, req, res) => res.status(500).json({ statusCode: 500, msg: "Internal server error"}));

module.exports = app;