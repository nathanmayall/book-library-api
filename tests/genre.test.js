const { expect } = require("chai");
const request = require("supertest");
const { Genre } = require("../src/models");
const app = require("../src/app");

describe("/genres", () => {
  let genres;
  before(async () => Genre.sequelize.sync());

  beforeEach(async () => {
    await Genre.destroy({ where: {} });

    await Promise.all([
      Genre.create({
        genre: "Sci-Fi",
      }),
      Genre.create({
        genre: "Horror",
      }),
      Genre.create({
        genre: "Fiction",
      }),
    ]);
    genres = await Genre.findAll();
  });

  describe("with no records in the database", () => {
    describe("POST /genres", () => {
      it("creates a new genre in the database", async () => {
        const response = await request(app).post("/genres").send({
          genre: "Self Help",
        });
        const newAuthorRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.genre).to.equal("Self Help");
        expect(newAuthorRecord.genre).to.equal("Self Help");
      });
      it("rejects invalid input", async () => {
        const response = await request(app).post("/genres").send({
          genre: "",
        });

        expect(response.status).to.equal(400);
        expect(response.body.genre).to.equal("A genre must be entered");
      });
    });
  });

  describe("GET /genres", () => {
    it("gets all genres records", async () => {
      const response = await request(app).get("/genres");

      expect(response.status).to.equal(200);
      expect(response.body.length).to.equal(3);

      response.body.forEach((genre) => {
        const expected = genres.find((a) => a.id === genre.id);

        expect(genre.genre).to.equal(expected.genre);
      });
    });
  });

  describe("GET /genres/:id", () => {
    it("gets genre record by id", async () => {
      const genre = genres[0];
      const response = await request(app).get(`/genres/${genre.id}`);

      expect(response.status).to.equal(200);
      expect(response.body.genre).to.equal(genre.genre);
    });

    it("returns a 404 if the genre does not exist", async () => {
      const response = await request(app).get("/genres/12345");

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The genre could not be found.");
    });
  });

  describe("PATCH /genres/:id", () => {
    it("updates genres name by id", async () => {
      const genre = genres[0];
      const response = await request(app)
        .patch(`/genres/${genre.id}`)
        .send({ genre: "History" });
      const updatedAuthorRecord = await Genre.findByPk(genre.id, {
        raw: true,
      });

      expect(response.status).to.equal(200);
      expect(updatedAuthorRecord.genre).to.equal("History");
    });

    it("returns a 404 if the genre does not exist", async () => {
      const response = await request(app)
        .patch("/genres/12345")
        .send({ genre: "Scientific" });

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The genre could not be found.");
    });
  });

  describe("DELETE /genres/:id", () => {
    it("deletes genre record by id", async () => {
      const genre = genres[0];
      const response = await request(app).delete(`/genres/${genre.id}`);
      const deletedReader = await Genre.findByPk(genre.id, { raw: true });

      expect(response.status).to.equal(204);
      expect(deletedReader).to.equal(null);
    });

    it("returns a 404 if the genre does not exist", async () => {
      const response = await request(app).delete("/genres/12345");
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("The genre could not be found.");
    });
  });
});
