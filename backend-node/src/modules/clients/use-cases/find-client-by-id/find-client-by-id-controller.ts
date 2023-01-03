import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindClientByIdUseCase } from "./find-client-by-id-use-case";

export class FindClientByIdController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const findClientByIdUseCase = container.resolve(FindClientByIdUseCase);

    const result = await findClientByIdUseCase.execute(id);

    return res.status(200).json(result);
  }
}
