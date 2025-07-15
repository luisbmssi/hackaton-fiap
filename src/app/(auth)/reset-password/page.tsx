"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { confirmPasswordReset } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { resetPasswordSchema } from "@/schemas/reset-password"

export default function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    const oobCode = searchParams.get("oobCode")

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault()
        const result = resetPasswordSchema.safeParse({ newPassword, confirmPassword })

        if (!result.success) {
            result.error.errors.forEach((err) => toast.error(err.message))
            return
        }


        if (!oobCode) {
            toast.error("Código inválido.")
            return
        }

        try {
            setLoading(true)
            await confirmPasswordReset(auth, oobCode, newPassword)
            toast.success("Senha redefinida com sucesso!")
            router.push("/login")
        } catch (err) {
            toast.error("Erro ao redefinir a senha. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleResetPassword} className="w-full max-w-md mx-auto flex flex-col gap-4 mt-10">
            <h1 className="text-2xl font-bold text-center">Nova Senha</h1>
            <Input
                type="password"
                placeholder="Digite a nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Confirmar senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" disabled={!newPassword || !confirmPassword || loading}>
                {loading ? "Redefinindo..." : "Redefinir Senha"}
            </Button>
        </form>
    )
}
