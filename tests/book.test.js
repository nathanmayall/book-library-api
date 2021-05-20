const { expect } = require("chai");
const request = require("supertest");
const { Book, Genre } = require("../src/models");
const app = require("../src/app");

describe("/books", () => {
  let books;
  let genres;

  before(async () => {
    Book.sequelize.sync();
    Genre.sequelize.sync();
  });

  beforeEach(async () => {
    await Book.destroy({ where: {} });
    await Genre.destroy({ where: {} });

    await Promise.all([
      Genre.create({
        genre: "Horror",
      }),
      Genre.create({
        genre: "Sci-fi",
      }),
    ]);

    genres = await Genre.findAll();

    await Promise.all([
      Book.create({
        title: "War of the worlds",
        author: "H G Welles",
        GenreId: genres[0].id,
        ISBN: "24353453212",
      }),
      Book.create({
        title: "1984",
        author: "George Orwell",
        GenreId: genres[0].id,
        ISBN: "22322432431",
      }),
      Book.create({
        title: "Bravo Two Zero",
        author: "Andy McNab",
        GenreId: genres[0].id,
        ISBN: "0459490512",
      }),
    ]);

    books = await Book.findAll();
  });

  describe("with no records in the database", () => {
    describe("POST /books", () => {
      it("creates a new book in the database", async () => {
        const response = await request(app).post("/books").send({
          title: "Javascript for 3 yr olds",
          author: "Vladimir Lenin",
          GenreId: "2",
          ISBN: "1112223311",
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal("Javascript for 3 yr olds");
        expect(newBookRecord.title).to.equal("Javascript for 3 yr olds");
        expect(newBookRecord.author).to.equal("Vladimir Lenin");
        expect(newBookRecord.GenreId).to.equal(2);
        expect(newBookRecord.ISBN).to.equal("1112223311");
      });
      it("rejects invalid input", async () => {
        const response = await request(app).post("/books").send({
          title: "",
          author: "he",
          ISBN: "1234",
        });

        expect(response.status).to.equal(400);
        expect(response.body.title).to.equal(
          "Title must be between 3 and 25 characters"
        );
        expect(response.body.author).to.equal(
          "Author must be between 3 and 25 characters"
        );
        expect(response.body.ISBN).to.equal(
          "ISBN must be between 10 and 13 characters"
        );
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
