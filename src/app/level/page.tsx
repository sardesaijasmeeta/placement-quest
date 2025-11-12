"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

function LevelPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const branch = searchParams.get("branch") || "";
  const role = searchParams.get("role") || "";
  const domain = searchParams.get("domain") || "";

  useEffect(() => {
    console.log("Loaded level page:", { branch, role, domain });
  }, [branch, role, domain]);

  function handleLevel(level: string) {
    router.push(`/game?branch=${branch}&role=${role}&domain=${domain}&level=${level}`);
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Select Difficulty Level</h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {["Easy", "Medium", "Hard", "Auto"].map((level) => (
          <button
            key={level}
            onClick={() => handleLevel(level.toLowerCase())}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function LevelPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading levels...</div>}>
      <LevelPageInner />
    </Suspense>
  );
}
