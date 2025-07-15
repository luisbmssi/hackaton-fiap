import { z } from "zod";

export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
    });
