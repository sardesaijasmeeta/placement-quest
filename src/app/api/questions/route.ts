import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { branch, role, domain, level, count } = await req.json();

    const prompt = `
    You are an AI quiz generator for placement preparation.

    Create ${count} multiple-choice questions (MCQs) for:
    - Branch: ${branch}
    - Role: ${role}
    - Domain: ${domain}
    - Difficulty Level: ${level}

    Each question must follow this JSON format:
    [
      {
        "question": "Question text?",
        "options": ["A", "B", "C", "D"],
        "answer": "Correct option letter",
        "explanation": "Short explanation for the correct answer."
      }
    ]

    Output only valid JSON (array of ${count} objects). No extra text or markdown.
    `;

    const model = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
      .getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");
    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    const questions = JSON.parse(jsonString);

    return NextResponse.json({ questions });
  } catch (err: any) {
    console.error("Error generating questions:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
