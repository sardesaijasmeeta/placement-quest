"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function QuestionCountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const branch = searchParams.get("branch");
  const role = searchParams.get("role");
  const domain = searchParams.get("domain");
  const level = searchParams.get("level");

  const [count, setCount] = useState(5);

  const handleNext = () => {
    router.push(
      `/game?branch=${branch}&role=${role}&domain=${domain}&level=${level}&count=${count}`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h1 className="text-3xl font-bold mb-6">Select Number of Questions</h1>

      <input
        type="range"
        min="5"
        max="30"
        step="1"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="w-64 mb-4 accent-blue-500"
      />
      <p className="text-lg mb-6">{count} Questions</p>

      <button
        onClick={handleNext}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all"
      >
        Continue →
      </button>
    </div>
  );
}
