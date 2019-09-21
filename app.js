const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const auth = require("./auth");
const { getMovies } = require("./movies");

app.use(cors());
app.use(helmet());
const morganSetting = process.env.NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganSetting));
app.use(auth);

app.get("/movies", getMovies);

module.exports = app;
