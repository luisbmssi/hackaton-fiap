"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  onSubmit: (prompt: string) => void
  loading: boolean
}

export function PromptInput({ onSubmit, loading }: Props) {
  const [prompt, setPrompt] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!prompt.trim()) return
    onSubmit(prompt)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-6">
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Digite o tema desejado..."
      />
      <Button type="submit" disabled={loading || !prompt}>
        {loading ? "Gerando..." : "Gerar"}
      </Button>
    </form>
  )
}
