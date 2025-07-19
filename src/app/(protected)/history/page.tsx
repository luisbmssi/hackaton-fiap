"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { db } from "@/lib/firebase"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { GeminiResponse } from "@/types/gemini-response"
import { ContentPreview } from "@/components/contentPreview"
import { Card, CardContent } from "@/components/ui/card"
import { ExportPDFButton } from "@/components/pdf/exportPdfButton"

interface HistoryItem {
  id: string
  topic: string
  result: GeminiResponse
  createdAt: string
}

export default function HistoryPage() {
  const { user } = useAuth()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null)

  useEffect(() => {
    if (!user) return

    const ref = collection(db, "history")
    const q = query(ref, where("userId", "==", user.uid), orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("passou aqui");

      const data: HistoryItem[] = snapshot.docs.map(doc => ({
        id: doc.id,
        topic: doc.data().topic,
        result: doc.data().result,
        createdAt: doc.data().createdAt?.toDate().toLocaleString() ?? "",
      }))
      setHistory(data)
    })

    return () => unsubscribe()
  }, [user])

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Histórico de Gerações</h1>

      {selectedItem ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <button
              className="text-blue-600 underline"
              onClick={() => setSelectedItem(null)}
            >
              ← Voltar para o histórico
            </button>

            {/* ✅ Botão de exportar PDF para o item selecionado */}
            <ExportPDFButton topic={selectedItem.topic} data={selectedItem.result} />
          </div>
          <h2 className="text-xl font-semibold mb-2">Tema: {selectedItem.topic}</h2>
          <ContentPreview data={selectedItem.result} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {history.map((item) => (
            <Card key={item.id} className="cursor-pointer hover:shadow-lg" onClick={() => setSelectedItem(item)}>
              <CardContent className="p-4">
                <h3 className="font-semibold">{item.topic}</h3>
                <p className="text-sm text-muted-foreground">{item.createdAt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
