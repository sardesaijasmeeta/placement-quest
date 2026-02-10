"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResultsInner() {
  const searchParams = useSearchParams();

  const score = searchParams.get("score");
  const total = searchParams.get("total");

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Your Result</h1>
      <p className="text-xl">
        Score: {score} / {total}
      </p>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading results...</div>}>
      <ResultsInner />
    </Suspense>
  );
}
