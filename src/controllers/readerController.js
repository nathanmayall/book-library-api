const { getAll, getOne, updateOne, addOne, deleteOne } = require("./helpers");

const addReader = async (req, res, next) => addOne(req, res, "reader", next);

const getAllReaders = async (_, res, next) => getAll(res, "reader", next);

const getOneReader = async (req, res, next) => getOne(req, res, "reader", next);

const updateAReader = async (req, res, next) =>
  updateOne(req, res, "reader", next);

const deleteAReader = async (req, res, next) =>
  deleteOne(req, res, "reader", next);

module.exports = {
  addReader,
  getAllReaders,
  getOneReader,
  updateAReader,
  deleteAReader,
};
