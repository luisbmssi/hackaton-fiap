"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/schemas/loginSchema";
import { FlipWords } from "@/components/ui/flip-words";

export default function Login() {
  const { login } = useAuth()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = { email, password }

    const result = loginSchema.safeParse(formData)

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message)
      errorMessages.forEach((msg) => toast.error(msg))
      return
    }

    setLoading(true)

    try {
      await login(email, password)

      router.push("/dashboard")
    } catch (e) {
      toast.error("Credenciais inválidas. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  const words = ["produtividade", "eficácia", "organização"]

  return (
    <div className="w-full flex items-center justify-center gap-5">
      {/* Conteúdo esquerdo */}
      <div className="w-1/4">
        <div className="mb-10 space-y-5">
          <h1 className="font-semibold text-4xl text-center">Bem vindo!</h1>
          <div className="text-center font-normal text-zinc-600">
            Simplifique seu trabalho e aumente sua
            produtividade
            <br /> Comece a usar <span className="font-bold text-black">EducaAI</span> agora mesmo.
          </div>
        </div>
        <form className="flex flex-col gap-3 mb-10" onSubmit={handleLogin}>
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Link href={"/forgot-password"} className="font-semibold text-sm text-right hover:underline">Esqueceu a senha?</Link>
          <Button type="submit" disabled={!email || !password || loading}>
            {loading ? "Carregando..." : "Entrar"}
          </Button>
        </form>
        <p className="text-center">Ainda não tem conta? <Link href={"/register"} className="font-semibold hover:underline">Registre-se agora!</Link></p>
      </div>
      {/* Conteúdo direito */}
    </div>
  )
}