const express = require("express");
const morgan = require("morgan");
const readerRoutes = require("./routes/reader");

const app = express();

app.use(morgan("tiny"), express.json());

app.use(readerRoutes);

module.exports = app;
