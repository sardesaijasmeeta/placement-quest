export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { branch, role, domain, level, count } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY not found in environment!");
      return NextResponse.json(
        { error: "❌ GEMINI_API_KEY not found in environment." },
        { status: 500 }
      );
    }

    console.log("✅ GEMINI_API_KEY found in environment!");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

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

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract the valid JSON from Gemini’s response
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");
    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    const questions = JSON.parse(jsonString);

    return NextResponse.json({ questions });
  } catch (err: any) {
    console.error("❌ Error generating questions:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const { branch, role, domain, level, count } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY not found in environment!");
      return NextResponse.json(
        { error: "❌ GEMINI_API_KEY not found in environment." },
        { status: 500 }
      );
    }

    console.log("✅ GEMINI_API_KEY found in environment!");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

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

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Extract the valid JSON from Gemini’s response
    const jsonStart = text.indexOf("[");
    const jsonEnd = text.lastIndexOf("]");
    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    const questions = JSON.parse(jsonString);

    return NextResponse.json({ questions });
  } catch (err: any) {
    console.error("❌ Error generating questions:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
