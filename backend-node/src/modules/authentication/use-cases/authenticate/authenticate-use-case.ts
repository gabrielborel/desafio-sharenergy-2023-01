import { AppError } from "../../../../shared/errors/AppError";
import { IAuthenticateDTO } from "../../dtos/authenticate-dto";
import { sign } from "jsonwebtoken";

export class AuthenticateUseCase {
  async execute(data: IAuthenticateDTO) {
    const { username, password } = data;

    const CORRECT_USERNAME = "desafiosharenergy";
    const CORRECT_PASSWORD = "sh@r3n3rgy";
    const usernameIsIncorrect = username !== CORRECT_USERNAME;
    const passwordIsIncorrect = password !== CORRECT_PASSWORD;

    if (passwordIsIncorrect || usernameIsIncorrect) {
      throw new AppError(401, "Nome de usuário ou senha inválidos.");
    }

    const token = sign({}, `${process.env.JWT_SECRET}`, {
      expiresIn: "7d",
    });

    return { token };
  }
}
