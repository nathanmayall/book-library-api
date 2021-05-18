const express = require("express");

const book = express.Router();

const {
  addBook,
  getAllBooks,
  getOneBook,
  updateABook,
  deleteABook,
} = require("../controllers/bookController");

book.route("/books").get(getAllBooks).post(addBook);

book.route("/books/:Id").get(getOneBook).patch(updateABook).delete(deleteABook);

module.exports = book;
