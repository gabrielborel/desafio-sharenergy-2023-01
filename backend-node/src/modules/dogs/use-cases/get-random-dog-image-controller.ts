import { GetRandomDogImageUseCase } from "./get-random-dog-image-use-case";
import { Request, Response } from "express";

export class GetRandomDogImageController {
  async handle(req: Request, res: Response) {
    const getRandomDogImageUseCase = new GetRandomDogImageUseCase();
    const result = await getRandomDogImageUseCase.execute();
    return res.status(200).json(result);
  }
}
