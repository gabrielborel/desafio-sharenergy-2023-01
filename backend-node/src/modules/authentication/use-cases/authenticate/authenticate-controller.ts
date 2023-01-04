import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { AuthenticateUseCase } from "./authenticate-use-case";

export class AuthenticateController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const authenticateUseCase = container.resolve(AuthenticateUseCase);

    try {
      const result = await authenticateUseCase.execute({
        password,
        username,
      });

      return res.status(201).json(result);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
