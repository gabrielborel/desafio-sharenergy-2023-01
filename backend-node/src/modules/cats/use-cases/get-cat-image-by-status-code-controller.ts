import { AxiosError } from "axios";
import { Request, Response } from "express";
import { AppError } from "../../../shared/errors/AppError";
import { GetCatImageByStatusCodeUseCase } from "./get-cat-image-by-status-code-use-case";

export class GetCatImageByStatusCodeController {
  async handle(req: Request, res: Response) {
    const { code } = req.params;

    const getCatImageByStatusCodeUseCase = new GetCatImageByStatusCodeUseCase();

    try {
      const result = await getCatImageByStatusCodeUseCase.execute(+code);

      return res.status(200).json(result);
    } catch (err) {
      if (err instanceof AxiosError) {
        return res.status(err.response?.status!).json({ message: err.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
