import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateClientUseCase } from "./create-client-use-case";

export class CreateClientController {
  async handle(req: Request, res: Response) {
    const data = req.body;

    const createClientUseCase = container.resolve(CreateClientUseCase);

    const result = await createClientUseCase.execute(data);

    return res.status(201).json(result);
  }
}
