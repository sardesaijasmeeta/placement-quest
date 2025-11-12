"use client";

import { useRouter } from "next/navigation";

const branches = ["IT", "CMPN", "ENTC", "CIVIL", "MECH"];

export default function BranchPage() {
  const router = useRouter();

  function handleSelect(branch: string) {
    router.push(`/role?branch=${branch}`);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Choose Your Branch</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {branches.map((branch) => (
          <button
            key={branch}
            onClick={() => handleSelect(branch)}
            className="bg-gray-800 border border-gray-700 shadow-md px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-700 transition hover:scale-105 active:scale-95"
          >
            {branch}
          </button>
        ))}
      </div>
    </main>
  );
}
