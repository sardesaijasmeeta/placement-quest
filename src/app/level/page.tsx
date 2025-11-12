"use client";

import { useRouter, useSearchParams } from "next/navigation";

const levels = ["Easy", "Medium", "Hard", "Auto"];

export default function LevelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const branch = searchParams.get("branch");
  const role = searchParams.get("role");
  const domain = searchParams.get("domain");

  function handleSelect(level: string) {
    router.push(`/questioncount?branch=${branch}&role=${role}&domain=${domain}&level=${level}`);

  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Select Difficulty Level</h1>
      <p className="text-lg mb-8 text-gray-300">
        Domain: <span className="font-semibold text-blue-400">{domain}</span> |
        Role: <span className="font-semibold text-blue-400">{role}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {levels.map((level) => (
          <button
            key={level}
            onClick={() => handleSelect(level)}
            className="bg-gray-800 border border-gray-700 px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-700 transition hover:scale-105 active:scale-95"
          >
            {level}
          </button>
        ))}
      </div>

      <p className="mt-8 text-gray-400 text-center max-w-md">
        <strong>Auto Mode:</strong> starts at Easy and increases difficulty
        automatically as you answer correctly. If you miss a question, the
        level stays the same.
      </p>
    </main>
  );
}
