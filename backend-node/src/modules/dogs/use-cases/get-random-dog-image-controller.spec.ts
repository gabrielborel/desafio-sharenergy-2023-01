import request from "supertest";
import { app } from "../../../app";
import { AuthenticateUseCase } from "../../authentication/use-cases/authenticate/authenticate-use-case";

describe("Dogs Controller", () => {
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

  it("should be able to get a random dog image", async () => {
    const res = await request(app)
      .get("/dogs")
      .send()
      .set({ Authorization: `Bearer ${accessToken}` });

    expect(res.body).toBeTruthy();
  });
});
