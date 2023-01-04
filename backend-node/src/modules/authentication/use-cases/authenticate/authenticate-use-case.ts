import { AppError } from "../../../../shared/errors/AppError";
import { IAuthenticateDTO } from "../dtos/authenticate-dto";
import { sign } from "jsonwebtoken";

export class AuthenticateUseCase {
  async execute(data: IAuthenticateDTO) {
    const { username, password, rememberMe = false } = data;

    const CORRECT_USERNAME = "desafiosharenergy";
    const CORRECT_PASSWORD = "sh@r3n3rgy";
    const usernameIsIncorrect = username !== CORRECT_USERNAME;
    const passwordIsIncorrect = password !== CORRECT_PASSWORD;

    if (passwordIsIncorrect || usernameIsIncorrect) {
      throw new AppError(401, "Nome de usuário ou senha inválidos.");
    }

    const expiresIn = rememberMe ? "7d" : "10m";
    const token = sign({}, "92eb5ffee6ae2fec3ad71c777531578f", { expiresIn });

    return { token };
  }
}
