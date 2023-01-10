import request from "supertest";
import { app } from "../../../../app";

describe("Authenticate Controller", () => {
  const CORRECT_USERNAME = "desafiosharenergy";
  const CORRECT_PASSWORD = "sh@r3n3rgy";

  it("should be able to authenticate", async () => {
    const res = await request(app).post("/authenticate").send({
      username: CORRECT_USERNAME,
      password: CORRECT_PASSWORD,
    });

    expect(res.body).toHaveProperty("token");
  });

  it("should not be able to authenticate with wrong username", async () => {
    const res = await request(app).post("/authenticate").send({
      username: "desrenergybbb",
      password: CORRECT_PASSWORD,
    });

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Nome de usuário ou senha inválidos.");
  });

  it("should not be able to authenticate with wrong pasword", async () => {
    const res = await request(app).post("/authenticate").send({
      username: CORRECT_USERNAME,
      password: "sh@basbas",
    });

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Nome de usuário ou senha inválidos.");
  });
});
