import { AxiosError } from "axios";
import { GetRandomDogImageUseCase } from "./get-random-dog-image-use-case";
import { Request, Response } from "express";

export class GetRandomDogImageController {
  async handle(req: Request, res: Response) {
    const getRandomDogImageUseCase = new GetRandomDogImageUseCase();

    try {
      const result = await getRandomDogImageUseCase.execute();
      return res.status(200).json(result);
    } catch (err) {
      if (err instanceof AxiosError) {
        return res.status(err.response?.status!).json(err.message);
      }

      return res.status(500).json("Internal server error");
    }
  }
}
