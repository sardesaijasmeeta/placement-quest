"use client";
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ResultsInner() {
  const params = useSearchParams();
  const score = params.get("score");
  const total = params.get("total");

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <h1 className="text-3xl">
        Score: {score} / {total}
      </h1>
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <ResultsInner />
    </Suspense>
  );
}
