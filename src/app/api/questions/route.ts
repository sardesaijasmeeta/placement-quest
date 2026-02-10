import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { branch, role, domain, level, count } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "API key missing" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
 model: "gemini-2.5-flash",

});


    const prompt = `
Create ${count} multiple choice questions for placement preparation.

Domain: ${domain}
Difficulty: ${level}

Return ONLY valid JSON:
[
  {
    "question": "...",
    "options": ["A", "B", "C", "D"],
    "answer": "correct option text",
    "explanation": "short explanation"
  }
]
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    const json = text.slice(start, end + 1);

    const questions = JSON.parse(json);

    return NextResponse.json({ questions });

  } catch (error: any) {
   console.error("API ERROR FULL:", JSON.stringify(error, null, 2));

    // 🔴 Detect quota error
    if (error?.status === 429 || error?.message?.includes("quota")) {
      return NextResponse.json({
        quotaExceeded: true,
      });
    }

    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}
