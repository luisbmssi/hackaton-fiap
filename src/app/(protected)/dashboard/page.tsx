"use client"

import { useState } from "react"
import { PromptExamples } from "@/components/promptExamples"
import { PromptInput } from "@/components/promptInput"
import { ContentPreview } from "@/components/contentPreview"
import { GeminiResponse } from "@/types/gemini-response"
import { saveToHistory } from "@/lib/save-to-history"
import { useAuth } from "@/hooks/useAuth"

export default function Dashboard() {
  const { user } = useAuth()
  const userId = user?.uid

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<GeminiResponse | null>(null)

  async function handlePromptSubmit(prompt: string) {
    setLoading(true)
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ topic: prompt }),
        headers: { "Content-Type": "application/json" },
      })

      // const res = await fetch("/api/parser-test", {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json" },
      // })

      const response = await res.json()
      setData(response.result)

      if (userId) {
        await saveToHistory({
          userId,
          topic: prompt,
          result: response.result,
        })
      }
    } catch (e) {
      console.error("Erro ao gerar:", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Gerador de Conteúdo Didático</h1>

      <PromptExamples onSelect={handlePromptSubmit} />
      <PromptInput onSubmit={handlePromptSubmit} loading={loading} />

      {data && <ContentPreview data={data} />}
    </main>
  )
}
