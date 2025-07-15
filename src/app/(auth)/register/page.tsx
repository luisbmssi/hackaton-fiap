"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FlipWords } from "@/components/ui/flip-words";
import { registerSchema } from "@/schemas/registerSchema";

export default function Register() {
    const { createUser, updateUserProfile } = useAuth()
    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleCreateUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = { name, email, password }
        const result = registerSchema.safeParse(formData)

        if (!result.success) {
            const errorMessages = result.error.errors.map((err) => err.message)
            errorMessages.forEach((msg) => toast.error(msg))
            return
        }

        try {
            setLoading(true)
            const user = await createUser(email, password)
            await updateUserProfile(user, name)
            router.push("/dashboard")
        } catch (e) {
            toast.error("Credenciais inválidas. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full flex items-center justify-center gap-5">
            {/* Conteúdo esquerdo */}
            <div className="w-1/4">
                <div className="mb-10 space-y-5">
                    <h1 className="font-semibold text-4xl text-center">Registrar-se</h1>
                    {/* <div className="text-center font-normal text-zinc-600">
            Simplifique seu trabalho e aumente sua
            produtividade
            <br /> Comece a usar <span className="font-bold text-black">EducaAI</span> agora mesmo.
          </div> */}
                </div>
                <form className="flex flex-col gap-3 mb-10" onSubmit={handleCreateUser}>
                    <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit" disabled={!name || !email || !password || loading}>
                        {loading ? "Carregando..." : "Criar conta"}
                    </Button>
                </form>
                <p className="text-center">Já tem conta? <Link href={"/login"} className="font-semibold hover:underline">Fazer login</Link></p>
            </div>
            {/* Conteúdo direito */}
        </div>
    )
}