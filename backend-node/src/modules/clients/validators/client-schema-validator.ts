import { z } from "zod";

export const clientSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Nome é obrigatório." })
      .min(5, "O nome deve ter no mínimo 5 caracteres.")
      .max(30, "O nome deve ter no máximo 30 caracteres."),
    email: z
      .string({ required_error: "Email é obrigatório." })
      .email("Email inválido."),
    cellphone: z
      .string({ required_error: "Telefone é obrigatório." })
      .min(9, "O telefone deve ter no mínimo 9 dígitos.")
      .max(11, "O telefone deve ter no máximo 11 dígitos."),
    cpf: z
      .string({ required_error: "CPF é obrigatório." })
      .min(11, "O telefone deve ter no mínimo 11 dígitos.")
      .max(12, "O telefone deve ter no máximo 12 dígitos."),
    address: z
      .string({ required_error: "Endereço é obrigatório." })
      .min(20, "O endereço deve ter no mínimo 20 dígitos.")
      .max(70, "O endereço deve ter no máximo 70 dígitos."),
  }),
});
