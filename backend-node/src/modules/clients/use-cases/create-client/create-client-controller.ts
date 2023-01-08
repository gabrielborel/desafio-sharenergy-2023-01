import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateClientUseCase } from "./create-client-use-case";

export class CreateClientController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);

    try {
      const result = await createClientUseCase.execute(data);

      return res.status(201).json(result);
    } catch (err) {
      if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
