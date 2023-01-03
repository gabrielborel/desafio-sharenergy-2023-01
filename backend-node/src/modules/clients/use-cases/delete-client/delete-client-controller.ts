import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteClientUseCase } from "./delete-client-use-case";

export class DeleteClientController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const deleteClientUseCase = container.resolve(DeleteClientUseCase);

    await deleteClientUseCase.execute(id);

    return res.status(201).json();
  }
}
