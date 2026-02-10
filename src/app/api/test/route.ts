import { NextResponse } from "next/server";
import { verbalQuestions } from "@/data/verbal";

export async function POST(req: Request) {
  try {
    const { domain, level, count } = await req.json();

    // 🔹 Handle VERBAL using static dataset
    if (domain?.toLowerCase() === "verbal") {
      let pool: any[] = [];

      if (level === "easy") pool = verbalQuestions.easy;
      else if (level === "medium") pool = verbalQuestions.medium;
      else if (level === "hard") pool = verbalQuestions.hard;
      else {
        // auto → mix all
        pool = [
          ...verbalQuestions.easy,
          ...verbalQuestions.medium,
          ...verbalQuestions.hard,
        ];
      }

      // shuffle questions
      const shuffled = pool.sort(() => 0.5 - Math.random());

      return NextResponse.json({
        questions: shuffled.slice(0, count),
      });
    }

    // 🔸 Other domains not ready yet
    return NextResponse.json(
      { error: "Domain not supported yet" },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
