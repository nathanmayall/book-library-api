const express = require("express");

const genre = express.Router();

const {
  addGenre,
  getAllGenres,
  getOneGenre,
  updateAGenre,
  deleteAGenre,
} = require("../controllers/genreController");

genre.route("/genres").get(getAllGenres).post(addGenre);

genre
  .route("/genres/:Id")
  .get(getOneGenre)
  .patch(updateAGenre)
  .delete(deleteAGenre);

module.exports = genre;
