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
  console.log(err);
  res.status(500).send(err);
  // if (
  //   err.errors[0].type === "Validation error" ||
  //   err.errors[0].type === "notNull Violation"
  // ) {
  //   err.errors.map((e) => {
  //     errors[e.path] = e.message;
  //   });
  //   res.status(400).send(errors);
  // } else {
  //   console.log(err);
  //   res.status(500).send({ error: "Something went wrong" });
  // }
});

module.exports = app;
