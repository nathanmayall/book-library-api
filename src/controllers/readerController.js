const { Reader } = require("../models");

const addReader = async (req, res, next) => {
  try {
    const newReader = await Reader.create(req.body);
    res.status(201).send(newReader);
  } catch (err) {
    next(err);
  }
};

const getAllReaders = async (_, res, next) => {
  try {
    res.send(await Reader.findAll());
  } catch (err) {
    next(err);
  }
};

const getOneReader = async (req, res, next) => {
  try {
    const oneReader = await Reader.findByPk(req.params.Id);
    oneReader
      ? res.send(oneReader)
      : res.status(404).send({ error: "The reader could not be found." });
  } catch (err) {
    next(err);
  }
};

const updateAReader = async (req, res, next) => {
  try {
    const [isUpdated] = await Reader.update(
      { email: req.body.email },
      { where: { id: req.params.Id } }
    );

    isUpdated
      ? res.sendStatus(200)
      : res.status(404).send({ error: "The reader could not be found." });
  } catch (err) {
    next(err);
  }
};

const deleteAReader = async (req, res, next) => {
  try {
    const isDeleted = await Reader.destroy({ where: { id: req.params.Id } });

    isDeleted
      ? res.sendStatus(204)
      : res.status(404).send({ error: "The reader could not be found." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addReader,
  getAllReaders,
  getOneReader,
  updateAReader,
  deleteAReader,
};
