const express = require("express");
const morgan = require("morgan");
const readerRoutes = require("./routes/reader");
const bookRoutes = require("./routes/book");

const app = express();

app.use(morgan("tiny"), express.json());

app.use(readerRoutes);
app.use(bookRoutes);

module.exports = app;
