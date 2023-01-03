import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllClientsUseCase } from "./find-all-clients-use-case";

export class FindAllClientsController {
  async handle(req: Request, res: Response) {
    const findAllClientsUseCase = container.resolve(FindAllClientsUseCase);

    const result = await findAllClientsUseCase.execute();

    return res.status(200).json(result);
  }
}
