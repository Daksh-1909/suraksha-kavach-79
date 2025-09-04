// src/services/geminiClient.ts
import { GoogleGenerativeAI, type GenerativeModel } from "@google/generative-ai";

let model: GenerativeModel | null = null;
let initError: string | null = null;

export function getGeminiModel() {
  if (model) return { model, initError };

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
  const modelId =
    (import.meta.env.VITE_GEMINI_MODEL as string) || "gemini-1.5-flash";

  if (!apiKey) {
    initError =
      "Missing API key. Add VITE_GEMINI_API_KEY in .env.local and restart.";
    return { model: null, initError };
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: modelId });
    return { model, initError: null };
  } catch (err: any) {
    initError = err?.message || "Failed to initialize Gemini model.";
    return { model: null, initError };
  }
}
