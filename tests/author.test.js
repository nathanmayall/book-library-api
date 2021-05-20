const { expect } = require("chai");
const request = require("supertest");
const { Author } = require("../src/models");
const app = require("../src/app");

describe("/authors", () => {
  let authors;
  before(async () => Author.sequelize.sync());

  beforeEach(async () => {
    await Author.destroy({ where: {} });

    await Promise.all([
      Author.create({
        author: "Elizabeth Bennet",
      }),
      Author.create({
        author: "Arya Stark",
      }),
      Author.create({
        author: "Lyra Belacqua",
      }),
    ]);
    authors = await Author.findAll();
  });

  describe("with no records in the database", () => {
    describe("POST /authors", () => {
      it("creates a new author in the database", async () => {
        const response = await request(app).post("/authors").send({
          author: "Nathan Mayall",
        });
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.author).to.equal("Nathan Mayall");
        expect(newAuthorRecord.author).to.equal("Nathan Mayall");
      });
      it("rejects invalid input", async () => {
        const response = await request(app).post("/authors").send({
          name: "",
        });

        expect(response.status).to.equal(400);
        expect(response.body.author).to.equal("An author must be entered");
      });
    });
  });

  describe("GET /authors", () => {
    it("gets all authors records", async () => {
      const response = await request(app).get("/authors");

      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(3);

      response.body.forEach((author) => {
        const expected = authors.find((a) => a.id === author.id);

        expect(author.author).to.equal(expected.author);
      });
    });
  });

  describe("GET /authors/:id", () => {
    it("gets author record by id", async () => {
      const author = authors[0];
      const response = await request(app).get(`/authors/${author.id}`);

      expect(response.status).to.equal(200);
      expect(response.body.author).to.equal(author.author);
    });

    it("returns a 404 if the author does not exist", async () => {
      const response = await request(app).get("/authors/12345");

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The author could not be found.");
    });
  });

  describe("PATCH /authors/:id", () => {
    it("updates authors name by id", async () => {
      const author = authors[0];
      const response = await request(app)
        .patch(`/authors/${author.id}`)
        .send({ author: "George Washington" });
      const updatedAuthorRecord = await Author.findByPk(author.id, {
        raw: true,
      });

      expect(response.status).to.equal(200);
      expect(updatedAuthorRecord.author).to.equal("George Washington");
    });

    it("returns a 404 if the author does not exist", async () => {
      const response = await request(app)
        .patch("/authors/12345")
        .send({ author: "Charles Dickens" });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The author could not be found.");
    });
  });

  describe("DELETE /authors/:id", () => {
    it("deletes author record by id", async () => {
      const author = authors[0];
      const response = await request(app).delete(`/authors/${author.id}`);
      const deletedReader = await Author.findByPk(author.id, { raw: true });

      expect(response.status).to.equal(204);
      expect(deletedReader).to.equal(null);
    });

    it("returns a 404 if the author does not exist", async () => {
      const response = await request(app).delete("/authors/12345");
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The author could not be found.");
    });
  });
});
