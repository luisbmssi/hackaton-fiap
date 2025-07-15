import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string({required_error: "Senha obrigatória"}).min(6, "Senha deve ter no mínimo 6 caracteres"),
})
