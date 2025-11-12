import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const keyExists = !!process.env.GEMINI_API_KEY;
    if (!keyExists) {
      return NextResponse.json({ error: "❌ GEMINI_API_KEY not found in environment." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent("Respond with the word 'Hello' only.");
    const text = result.response.text();

    return NextResponse.json({ success: true, response: text });
  } catch (err: any) {
    console.error("❌ Gemini API Test Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
