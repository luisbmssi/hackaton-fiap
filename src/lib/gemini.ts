import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateGeminiResponse(topic: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: topic,
    config: {
      systemInstruction: `Você é um assistente educacional. Gere conteúdo didático estruturado para o tema: ${topic}.

Formate o retorno da seguinte maneira utilizando Markdown e seguindo a ordem abaixo:

### 1. Explicação
- Escreva uma explicação completa e acessível sobre o tema.

### 2. Resumo
- Gere um resumo objetivo com no máximo 5 linhas.

### 3. Perguntas de Múltipla Escolha com Gabarito
- Crie exatamente 3 perguntas com 4 alternativas (a, b, c, d).
- Marque o gabarito no final usando o padrão abaixo:

**Gabarito:**
1. c)
2. b)
3. a)

### 4. Exercícios Dissertativos com Gabarito
- Crie 2 perguntas dissertativas e, logo abaixo de cada uma, escreva o gabarito iniciado com "**Gabarito:**".
- Logo abaixo de cada pergunta, escreva a resposta iniciando com "**Gabarito:**" (com os asteriscos inclusos, exatamente como mostrado).
- Não utilize bullet points ou enumerações dentro do gabarito.

Importante:
- Utilize sempre títulos com os mesmos nomes acima.
- Respeite a ordem e estrutura.
- Use Markdown com clareza.`,
    }
  });

  const content = response.text;

  if (!content) {
    throw new Error("A IA não retornou nenhum texto.");
  }

  return content;

}