const { getAll, getOne, updateOne, deleteOne, addOne } = require("./helpers");

const addGenre = async (req, res, next) => addOne(req, res, "genre", next);

const getAllGenres = async (_, res, next) => getAll(res, "genre", next);

const getOneGenre = async (req, res, next) => getOne(req, res, "genre", next);

const updateAGenre = async (req, res, next) =>
  updateOne(req, res, "genre", next);

const deleteAGenre = async (req, res, next) =>
  deleteOne(req, res, "genre", next);

module.exports = {
  addGenre,
  getAllGenres,
  getOneGenre,
  updateAGenre,
  deleteAGenre,
};
