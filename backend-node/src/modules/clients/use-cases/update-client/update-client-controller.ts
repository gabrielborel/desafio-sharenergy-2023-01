import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateClientUseCase } from "./update-client-use-case";

export class UpdateClientController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    const result = await updateClientUseCase.execute(id, data);

    return res.status(201).json(result);
  }
}
