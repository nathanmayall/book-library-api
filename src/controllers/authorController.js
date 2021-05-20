const { getAll, getOne, updateOne, deleteOne, addOne } = require("./helpers");

const addAuthor = async (req, res, next) => addOne(req, res, "author", next);

const getAllAuthors = async (_, res, next) => getAll(_, res, "author", next);

const getOneAuthor = async (req, res, next) => getOne(req, res, "author", next);

const updateAnAuthor = async (req, res, next) =>
  updateOne(req, res, "author", next);

const deleteAnAuthor = async (req, res, next) =>
  deleteOne(req, res, "author", next);

module.exports = {
  addAuthor,
  getAllAuthors,
  getOneAuthor,
  updateAnAuthor,
  deleteAnAuthor,
};
