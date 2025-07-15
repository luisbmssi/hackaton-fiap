"use client"

export function PromptExamples({ onSelect }: { onSelect: (value: string) => void }) {
  const examples = [
    "Revolução Francesa",
    "Fotossíntese",
    "Sistema Solar",
    "Ciclo da Água",
    "Primeira Guerra Mundial",
  ];

  return (
    <div className="space-y-2">
      <h2 className="font-semibold text-lg">Sugestões de temas:</h2>
      <div className="flex flex-wrap gap-2">
        {examples.map((ex, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(ex)}
            className="px-3 py-1 bg-zinc-200 hover:bg-zinc-300 text-sm rounded-full transition"
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  );
}