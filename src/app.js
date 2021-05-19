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
  if (err.name === "SequelizeValidationError") {
    err.errors.map((e) => {
      errors[e.path] = e.message;
    });
    res.status(400).send(errors);
  } else if (err.statusCode) {
    res.status(err.statusCode).send({ error: `${err.type}` });
  } else {
    console.warn(err);
    res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = app;
