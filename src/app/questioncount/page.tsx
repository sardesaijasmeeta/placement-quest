"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

function QuestionCountInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const branch = searchParams.get("branch") || "";
  const role = searchParams.get("role") || "";
  const domain = searchParams.get("domain") || "";
  const level = searchParams.get("level") || "";

  const [count, setCount] = useState(5);

  useEffect(() => {
    console.log("Loaded question count page:", { branch, role, domain, level });
  }, [branch, role, domain, level]);

  const handleStart = () => {
    router.push(
      `/game?branch=${branch}&role=${role}&domain=${domain}&level=${level}&count=${count}`
    );
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        How Many Questions Do You Want?
      </h1>

      <input
        type="number"
        value={count}
        min={5}
        max={30}
        onChange={(e) => setCount(Number(e.target.value))}
        className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 w-32 text-center mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleStart}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
      >
        Start Game →
      </button>
    </div>
  );
}

export default function QuestionCountPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <QuestionCountInner />
    </Suspense>
  );
}
