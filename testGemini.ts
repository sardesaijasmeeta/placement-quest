import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const key = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(key);

async function test() {
  try {
    console.log("🚀 Connecting to Gemini via AI Studio SDK...");

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // safe default model
    const result = await model.generateContent("Say hello from Gemini 2.0 Flash!");

    console.log("✅ Response:", result.response.text());
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

test();
