const { expect } = require("chai");
const request = require("supertest");
const { Book } = require("../src/models");
const app = require("../src/app");

describe("/books", () => {
  let books;
  before(async () => Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });

    await Promise.all([
      Book.create({
        title: "War of the worlds",
        author: "H G Welles",
        genre: "Sci-Fi",
        ISBN: "243534532",
      }),
      Book.create({
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Horror",
        ISBN: "2232243243",
      }),
      Book.create({
        title: "Bravo Two Zero",
        author: "Andy McNab",
        genre: "Fiction",
        ISBN: "045949051",
      }),
    ]);
    books = await Book.findAll();
  });

  describe("with no records in the database", () => {
    describe("POST /books", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/books").send({
          title: "Javascript for 3 year olds",
          author: "Vladimir Lenin",
          genre: "Horror",
          ISBN: "1112223344dasasd",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal("Javascript for 3 year olds");
        expect(newBookRecord.title).to.equal("Javascript for 3 year olds");
        expect(newBookRecord.author).to.equal("Vladimir Lenin");
        expect(newBookRecord.genre).to.equal("Horror");
        expect(newBookRecord.ISBN).to.equal("1112223344dasasd");
      });
    });
  });

  describe("GET /books", () => {
    it("gets all book records", async () => {
      const response = await request(app).get("/books");

      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(3);

      response.body.forEach((book) => {
        const expected = books.find((a) => a.id === book.id);

        expect(book.title).to.equal(expected.title);
        expect(book.author).to.equal(expected.author);
      });
    });
  });

  describe("GET /books/:Id", () => {
    it("gets book record by ID", async () => {
      const book = books[0];
      const response = await request(app).get(`/books/${book.id}`);

      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal(book.title);
      expect(response.body.genre).to.equal(book.genre);
    });

    it("returns a 404 if the book does not exist", async () => {
      const response = await request(app).get("/books/12345");

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The book could not be found.");
    });
  });

  describe("PATCH /books/:Id", () => {
    it("updates books title by ID", async () => {
      const book = books[0];
      const response = await request(app)
        .patch(`/books/${book.id}`)
        .send({ title: "Python isn't so bad" });
      const updatedBookRecord = await Book.findByPk(book.id, {
        raw: true,
      });

      expect(response.status).to.equal(200);
      expect(updatedBookRecord.title).to.equal("Python isn't so bad");
    });

    it("returns a 404 if the book does not exist", async () => {
      const response = await request(app)
        .patch("/books/12345")
        .send({ email: "some_new_email@gmail.com" });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The book could not be found.");
    });
  });

  describe("DELETE /books/:id", () => {
    it("deletes book record by ID", async () => {
      const book = books[0];
      const response = await request(app).delete(`/books/${book.id}`);
      const deletedBook = await Book.findByPk(book.id, { raw: true });

      expect(response.status).to.equal(204);
      expect(deletedBook).to.equal(null);
    });

    it("returns a 404 if the book does not exist", async () => {
      const response = await request(app).delete("/books/12345");
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The book could not be found.");
    });
  });
});
