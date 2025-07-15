import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({ required_error: "Nome obrigatório" }).min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string({ required_error: "Email obrigatório" }).email("Email inválido"),
    password: z.string({ required_error: "Senha obrigatória" }).min(6, "Senha deve ter no mínimo 6 caracteres"),
})
