const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const AuthRouter = require("./routes/authentication/authentication");
const UserRouter = require("./routes/user/user");
const CommunitiesRouter = require("./routes/communities/communities");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/authentication', AuthRouter);
app.use('/user', UserRouter);
app.use("/communities", CommunitiesRouter);

module.exports = app;
