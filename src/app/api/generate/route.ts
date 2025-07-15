import { generateGeminiResponse } from "@/lib/gemini";
import { parseGeminiMarkdown } from "@/lib/parse-gemini";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { topic } = body

  if (!topic) {
    return NextResponse.json({ error: "O campo 'topic' é obrigatório." }, { status: 400 });
  }

  try {
    const result = await generateGeminiResponse(topic);

    console.log("🔍 Markdown gerado:\n", result);

    const parsed = parseGeminiMarkdown(result);

    return NextResponse.json({ result: parsed });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : String(error)

    return NextResponse.json({ error: message }, { status: 500 });
  }
}