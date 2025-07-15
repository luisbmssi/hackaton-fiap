import { GeminiResponse } from "@/types/gemini-response";

export function parseGeminiMarkdown(markdown: string) {
  const result: GeminiResponse = {
    explanation: "",
    summary: "",
    questions: [],
    essays: [],
  };

  // Extração da explicação
  const explanationMatch = markdown.match(/### 1\. Explicação\n+([\s\S]*?)\n+###/);
  if (explanationMatch) {
    result.explanation = explanationMatch[1].trim();
  }

  // Extração do resumo
  const summaryMatch = markdown.match(/### 2\. Resumo\n+([\s\S]*?)\n+###/);
  if (summaryMatch) {
    result.summary = summaryMatch[1].trim();
  }

  // Extração do gabarito
  const gabaritoMatch = markdown.match(/\*\*Gabarito:\*\*([\s\S]*?)\n+###/);
  const answersMap: Record<string, string> = {};
  if (gabaritoMatch) {
    gabaritoMatch[1]
      .trim()
      .split("\n")
      .forEach((line) => {
        const match = line.match(/^(\d+)\.\s*([a-d])\)/i);
        if (match) answersMap[match[1]] = match[2].toLowerCase();
      });
  }

  // Extração das perguntas de múltipla escolha
  const questionsSection = markdown.match(/### 3\. Perguntas de Múltipla Escolha com Gabarito\n+([\s\S]*?)\n+\*\*Gabarito:/);
  if (questionsSection) {
    const questionBlocks = Array.from(
      questionsSection[1].matchAll(/(\d+)\.\s+(.*?)((?:\n\s{4}[a-d]\).+)+)/g)
    );

    questionBlocks.forEach(([, number, question, optionsBlock]) => {
      const options = optionsBlock
        .trim()
        .split("\n")
        .map((line) => line.replace(/^\s*[a-d]\)\s*/, "").trim());

      result.questions.push({
        question: question.trim(),
        options,
        answer: answersMap[number] || "",
      });
    });
  }

  // Extração das questões dissertativas
  const essaysMatch = markdown.match(/### 4\. Exercícios Dissertativos com Gabarito\n+([\s\S]*)/);
  if (essaysMatch) {
    const essayBlocks = Array.from(
      essaysMatch[1].matchAll(/\d+\.\s+(.*?)\n\s*\*\*Gabarito:\*\*\s*([\s\S]*?)(?=\n+\d+\.|\n*$)/g)
    );

    essayBlocks.forEach(([, question, answer]) => {
      result.essays.push({
        question: question.trim(),
        answer: answer.trim(),
      });
    });
  }

  return result;
}
