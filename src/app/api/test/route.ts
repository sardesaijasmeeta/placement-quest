import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "❌ GEMINI_API_KEY not found in environment variables." },
        { status: 500 }
      );
    }

    // ✅ Initialize Gemini client
    const genAI = new GoogleGenerativeAI(apiKey);

    // ✅ Use supported model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    // ✅ Generate simple response to test API connectivity
    const result = await model.generateContent("Say 'Hello from Gemini on Vercel!'");
    const text = result.response.text();

    return NextResponse.json({ success: true, response: text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: error.message || "Unknown Gemini error" },
      { status: 500 }
    );
  }
}
