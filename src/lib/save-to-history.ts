import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { GeminiResponse } from "@/types/gemini-response";

interface SaveHistoryParams {
  userId: string;
  topic: string;
  result: GeminiResponse;
}

export async function saveToHistory({ userId, topic, result }: SaveHistoryParams) {
  if (!userId) throw new Error("Usuário não autenticado.");
  
  try {
    await addDoc(collection(db, "history"), {
      userId,
      topic,
      result,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Erro ao salvar no Firestore:", error);
    throw error;
  }
}