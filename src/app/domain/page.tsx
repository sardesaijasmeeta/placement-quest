"use client";

import { useRouter, useSearchParams } from "next/navigation";

const domains = ["Verbal", "Technical", "Behavioural"];

export default function DomainPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const branch = searchParams.get("branch");
  const role = searchParams.get("role");

  function handleSelect(domain: string) {
    router.push(`/level?branch=${branch}&role=${role}&domain=${domain}`);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-44xl font-bold mb-6">Select Your Domain</h1>
      <p className="text-lg mb-8 text-gray-300">
        Branch: <span className="font-semibold text-blue-400">{branch}</span> | Role:{" "}
        <span className="font-semibold text-blue-400">{role}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {domains.map((domain) => (
          <button
            key={domain}
            onClick={() => handleSelect(domain)}
            className="bg-gray-800 border border-gray-700 px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-700 transition hover:scale-105 active:scale-95"
          >
            {domain}
          </button>
        ))}
      </div>
    </main>
  );
}
