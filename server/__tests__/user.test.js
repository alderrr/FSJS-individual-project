const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { signToken, verifyToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcryptjs");
const { queryInterface } = sequelize;

beforeAll(async () => {
  const data = require("../data/users.json");
  data.forEach((user) => {
    delete user.id;
    user.password = hashPassword(user.password);
    user.createdAt = new Date();
    user.updatedAt = new Date();
  });
  await queryInterface.bulkInsert("Users", data, {});
  const payload1 = {
    id: 1,
    email: "alder36@yahoo.co.id",
  };
  access_token1 = signToken(payload1);
});
afterAll(async () => {
  await queryInterface.bulkDelete("Users", null, {
    restartIdentity: true,
    truncate: true,
    cascade: true,
  });
});

describe("POST /login", () => {
  describe("POST /login - Success", () => {
    it("200 Success login - should return access_token", async () => {
      const body = {
        email: "alder36@yahoo.co.id",
        password: "12345678",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("access_token", expect.any(String));
    });
  });
  describe("POST /login - Failed", () => {
    it("400 Failed login - should return error message, Email is required", async () => {
      const body = {
        email: null,
        password: "12345678",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
    });
    it("400 Failed login - should return error message, Password is required", async () => {
      const body = {
        email: "alder@mail.com",
        password: null,
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Password is required");
    });
    it("401 Failed login - should return error message, Invalid email/password (Invalid email)", async () => {
      const body = {
        email: "alde@mail.com",
        password: "12345678",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid email/password");
    });
    it("401 Failed login - should return error message, Invalid email/password (Invalid password)", async () => {
      const body = {
        email: "alder@mail.com",
        password: "123456786",
      };
      const response = await request(app).post("/login").send(body);
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid email/password");
    });
  });
});
describe("POST /register", () => {
  describe("POST /register - Success", () => {
    it("201 Success register - should create new User", async () => {
      const body = {
        username: "Staff",
        email: "staff@mail.com",
        password: "12345678678",
      };
      const response = await request(app).post("/register").send(body);
      expect(response.status).toBe(201);
      console.log(response.body);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("email", body.email);
    });
  });
  describe("POST /register - Failed", () => {
    it("400 Failed register - should return error message, email is required (null)", async () => {
      const body = {
        username: "Staff",
        email: null,
        password: "12345678",
      };
      const response = await request(app).post("/register").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "email is required");
    });
    it("400 Failed register - should return error message, password is required (null)", async () => {
      const body = {
        username: "Staff",
        email: "staffError@mail.com",
        password: null,
      };
      const response = await request(app).post("/register").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "password is required");
    });
    it("400 Failed register - should return error message, Invalid email format (empty string)", async () => {
      const body = {
        username: "Staff",
        email: "",
        password: "12345678",
      };
      const response = await request(app).post("/register").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid email format");
    });
    it("400 Failed register - should return error message, password is required (empty string", async () => {
      const body = {
        username: "Staff",
        email: "staffError@mail.com",
        password: "",
      };
      const response = await request(app).post("/register").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "password is required");
    });
    it("400 Failed register - should return error message, email must be unique", async () => {
      const body = {
        username: "Staff",
        email: "staff@mail.com",
        password: "12345678",
      };
      const response = await request(app).post("/register").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "email must be unique");
    });
    it("400 Failed register - should return error message, Invalid email format", async () => {
      const body = {
        username: "Staff",
        email: "staffErrormail.com",
        password: "12345678",
      };
      const response = await request(app).post("/register").send(body);
      expect(response.status).toBe(400);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty("message", "Invalid email format");
    });
  });
});
