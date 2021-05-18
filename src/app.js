const express = require("express");
const morgan = require("morgan");
const readerRoutes = require("./routes/reader");
const bookRoutes = require("./routes/book");

const app = express();

app.use(morgan("tiny"), express.json());

app.use(readerRoutes);
app.use(bookRoutes);

app.use((err, req, res, next) => {
  const errors = {};

  err.errors.map((e) => {
    errors[e.path] = e.message;
  });

  res.status(400).send(errors);
});

module.exports = app;
