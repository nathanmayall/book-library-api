const express = require("express");

const reader = express.Router();

const {
  addReader,
  getAllReaders,
  getOneReader,
  updateAReader,
  deleteAReader,
} = require("../controllers/readerController");

reader.route("/readers").get(getAllReaders).post(addReader);

reader
  .route("/readers/:Id")
  .get(getOneReader)
  .patch(updateAReader)
  .delete(deleteAReader);

module.exports = reader;
