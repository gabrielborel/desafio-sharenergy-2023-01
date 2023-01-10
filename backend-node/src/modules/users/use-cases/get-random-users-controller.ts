import { AxiosError } from "axios";
import { Request, Response } from "express";
import { GetRandomUsersUseCase } from "./get-random-users-use-case";

export class GetRandomUsersController {
  async handle(req: Request, res: Response) {
    const getRandomUsersUseCase = new GetRandomUsersUseCase();

    try {
      const result = await getRandomUsersUseCase.execute();
      return res.status(200).json(result);
    } catch (err) {
      if (err instanceof AxiosError) {
        return res.status(err.response?.status!).json(err.message);
      }

      return res.status(500).json("Internal server error");
    }
  }
}
