require("dotenv").config();

const express = require("express");
const cors = require("cors");

const passport = require("./lib/passport");
const router = require("./routes");

const app = express();

const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(router);

module.exports = app;
