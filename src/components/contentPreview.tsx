"use client"

import { GeminiResponse } from "@/types/gemini-response"

interface Props {
  data: GeminiResponse
}

export function ContentPreview({ data }: Props) {
  return (
    <div className="mt-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Explicação:</h2>
        <p>{data.explanation}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Resumo:</h2>
        <p>{data.summary}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Questões de Múltipla Escolha:</h2>
        {data.questions.map((q, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium">{i + 1}. {q.question}</p>
            <div className=" space-y-1">
              {q.options.map((opt, idx) => (
                <p key={idx}>
                  <span className="font-semibold mr-0.5">{String.fromCharCode(97 + idx)})</span> {/* a), b), c)... */}
                  {opt}
                </p>
              ))}
            </div>
            <p className="text-sm mt-1">Gabarito: <strong>{q.answer.toUpperCase()}</strong></p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold">Exercícios Dissertativos:</h2>
        {data.essays.map((e, i) => (
          <div key={i} className="mb-4">
            <p className="font-medium">{i + 1}. {e.question}</p>
            <p className="text-sm mt-1"><strong>Gabarito:</strong> {e.answer}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
