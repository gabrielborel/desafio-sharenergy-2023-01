import { NextFunction, request, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

interface IPayload {
  sub: string;
}

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization!;
  if (!authHeader) {
    return res.status(401).json({ message: "Token não encontrado." });
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ message: "Token não encontrado." });
  }

  try {
    verify(token, "92eb5ffee6ae2fec3ad71c777531578f") as IPayload;

    next();
  } catch {
    return res.status(401).json({ message: "Token inválido." });
  }
};
