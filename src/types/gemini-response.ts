export type GeminiResponse = {
  explanation: string;
  summary: string;
  questions: {
    question: string;
    options: string[];
    answer: string;
  }[];
  essays: {
    question: string;
    answer: string;
  }[];
};