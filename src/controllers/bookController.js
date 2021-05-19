const { getAll, getOne, updateOne, deleteOne, addOne } = require("./helpers");

const addBook = async (req, res, next) => addOne(req, res, "book", next);

const getAllBooks = async (_, res, next) => getAll(res, "book", next);

const getOneBook = async (req, res, next) => getOne(req, res, "book", next);

const updateABook = async (req, res, next) => updateOne(req, res, "book", next);

const deleteABook = async (req, res, next) => deleteOne(req, res, "book", next);

module.exports = {
  addBook,
  getAllBooks,
  getOneBook,
  updateABook,
  deleteABook,
};
