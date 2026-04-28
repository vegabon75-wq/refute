import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const API_KEY = process.env.VITE_GEMINI_API_KEY;

async function listModels() {
  if (!API_KEY) {
    console.error("VITE_GEMINI_API_KEY is not set in .env.local");
    return;
  }
  const genAI = new GoogleGenerativeAI(API_KEY);
  try {
    // There isn't a direct listModels in the SDK easily available like this without a specific method.
    // Actually, the SDK doesn't expose listModels directly on the genAI instance in all versions.
    // However, we can try to use a default model to see if it works.
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent("Hello");
    const response = await result.response;
    console.log("Gemini Pro success:", response.text());
  } catch (error) {
    console.error("Gemini Pro failed:", error.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent("Hello");
    const response = await result.response;
    console.log("Gemini 1.5 Flash success:", response.text());
  } catch (error) {
    console.error("Gemini 1.5 Flash failed:", error.message);
  }
}

listModels();
