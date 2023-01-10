import request from "supertest";
import { app } from "../../../app";
import { AuthenticateUseCase } from "../../authentication/use-cases/authenticate/authenticate-use-case";

describe("Cats Controller", () => {
  let authenticateUseCase: AuthenticateUseCase;
  let accessToken: string;

  beforeAll(async () => {
    authenticateUseCase = new AuthenticateUseCase();

    const { token } = await authenticateUseCase.execute({
      username: "desafiosharenergy",
      password: "sh@r3n3rgy",
    });
    accessToken = token;
  });

  it("should be able to get a cat image from a existent http status code", async () => {
    const HTTP_STATUS_CODE = 401;
    const res = await request(app)
      .get(`/cats/${HTTP_STATUS_CODE}`)
      .send()
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toBeTruthy();
  });

  it("should not be able to get a cat image from a non-existent http status code", async () => {
    const HTTP_STATUS_CODE = 999;
    const res = await request(app)
      .get(`/cats/${HTTP_STATUS_CODE}`)
      .send()
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Request failed with status code 404");
  });
});
