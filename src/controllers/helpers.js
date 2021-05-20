const { Book, Reader, Author, Genre } = require("../models");

const removePassword = (oldObj) => {
  if (oldObj.dataValues?.password) delete oldObj.dataValues.password;
  if (oldObj.length >= 1) oldObj.map((o) => delete o.dataValues?.password);
  return oldObj;
};

const getModel = (model) => {
  switch (model) {
    case "book":
      return Book;
    case "reader":
      return Reader;
    case "author":
      return Author;
    case "genre":
      return Genre;
    default:
      throw new Error("Model not passed into helper function");
  }
};

const includeModels = (model) => {
  switch (model) {
    case "book":
      return { include: Genre };
    case "genre":
      return { inclide: Book };
    default:
      return {};
  }
};

const addOne = async (req, res, item, next) => {
  try {
    res.status(201).send(removePassword(await getModel(item).create(req.body)));
  } catch (err) {
    next(err);
  }
};

const getAll = async (_, res, item, next) => {
  try {
    res.send(removePassword(await getModel(item).findAll()));
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, item, next) => {
  try {
    const oneItem = await getModel(item).findByPk(
      req.params.Id,
      includeModels(item)
    );

    oneItem
      ? res.send(removePassword(oneItem))
      : res.status(404).send({ error: `The ${item} could not be found.` });
  } catch (err) {
    next(err);
  }
};

const updateOne = async (req, res, item, next) => {
  try {
    const [isUpdated] = await getModel(item).update(req.body, {
      where: { id: req.params.Id },
    });
    isUpdated
      ? res.sendStatus(200)
      : res.status(404).send({ error: `The ${item} could not be found.` });
  } catch (err) {
    next(err);
  }
};

const deleteOne = async (req, res, item, next) => {
  try {
    const isDeleted = await getModel(item).destroy({
      where: { id: req.params.Id },
    });
    isDeleted
      ? res.sendStatus(204)
      : res.status(404).send({ error: `The ${item} could not be found.` });
  } catch (err) {
    next(err);
  }
};

const getAllBooks = async (_, res, item, next) => {
  try {
    res.send(await getModel(item).findAll({ include: Book }));
  } catch (err) {
    next(err);
  }
};

module.exports = { addOne, getAll, getOne, updateOne, deleteOne, getAllBooks };
