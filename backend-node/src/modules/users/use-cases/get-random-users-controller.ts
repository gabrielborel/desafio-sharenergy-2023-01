import { Request, Response } from "express";
import { GetRandomUsersUseCase } from "./get-random-users-use-case";

export class GetRandomUsersController {
  async handle(req: Request, res: Response) {
    const getRandomUsersUseCase = new GetRandomUsersUseCase();
    const result = await getRandomUsersUseCase.execute();
    return res.status(200).json(result);
  }
}
