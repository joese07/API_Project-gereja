require("dotenv").config();

const express = require("express");
const cors = require("cors");

const passport = require("./lib/passport");
const router = require("./routes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(router);

module.exports = app;
