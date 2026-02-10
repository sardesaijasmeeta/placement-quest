"use client";
import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const params = useSearchParams();
  const score = params.get("score");
  const total = params.get("total");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Quiz Finished 🎉</h1>
      <p className="text-xl">Score: {score} / {total}</p>
    </div>
  );
}
