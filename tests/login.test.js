const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const { DB_HOST, PORT = 3000 } = process.env;

const account = {
  email: "test@example.com",
  password: "examplepassword",
};

describe("test login controller", () => {
  let server;

  beforeAll(async () => {
    await mongoose.connect(DB_HOST);
    server = app.listen(PORT);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  test("Response must have status code 200", async () => {
    const response = await request(app).post("/api/users/login").send(account);
    expect(response.status).toBe(200);
  });

  test("The token must be returned in the response", async () => {
    const response = await request(app).post("/api/users/login").send(account);
    expect(response.body).toHaveProperty("token");
  });

  test("The response should return a user object with 2 fields email and subscription, having the data type String", async () => {
    const response = await request(app).post("/api/users/login").send(account);
    expect(response.body.user).toMatchObject({
      email: expect.any(String),
      subscription: expect.any(String),
    });
  });
});
