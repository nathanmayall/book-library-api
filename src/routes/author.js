const express = require("express");

const author = express.Router();

const {
  addAuthor,
  getAllAuthors,
  getOneAuthor,
  updateAnAuthor,
  deleteAnAuthor,
} = require("../controllers/authorController");

author.route("/authors").get(getAllAuthors).post(addAuthor);

author
  .route("/authors/:Id")
  .get(getOneAuthor)
  .patch(updateAnAuthor)
  .delete(deleteAnAuthor);

module.exports = author;
