const { Book } = require("../models");

const addBook = async (req, res, next) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).send(newBook);
  } catch (err) {
    next(err);
  }
};

const getAllBooks = async (_, res, next) => {
  try {
    res.send(await Book.findAll());
  } catch (err) {
    next(err);
  }
};

const getOneBook = async (req, res, next) => {
  try {
    const oneBook = await Book.findByPk(req.params.Id);
    oneBook
      ? res.send(oneBook)
      : res.status(404).send({ error: "The book could not be found." });
  } catch (err) {
    next(err);
  }
};

const updateABook = async (req, res, next) => {
  try {
    const [isUpdated] = await Book.update(
      { title: req.body.title },
      { where: { id: req.params.Id } }
    );

    isUpdated
      ? res.sendStatus(200)
      : res.status(404).send({ error: "The book could not be found." });
  } catch (err) {
    next(err);
  }
};

const deleteABook = async (req, res, next) => {
  try {
    const isDeleted = await Book.destroy({ where: { id: req.params.Id } });

    isDeleted
      ? res.sendStatus(204)
      : res.status(404).send({ error: "The book could not be found." });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getOneBook,
  updateABook,
  deleteABook,
};
