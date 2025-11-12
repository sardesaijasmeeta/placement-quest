"use client";

import { useSearchParams, useRouter } from "next/navigation";

const rolesByBranch: Record<string, string[]> = {
  IT: ["Software Engineer", "Frontend Developer", "Data Analyst"],
  CMPN: ["Software Engineer", "Backend Developer", "Cloud Engineer"],
  ENTC: ["Embedded Engineer", "Network Engineer", "Test Engineer"],
  CIVIL: ["Site Engineer", "Structural Analyst", "Project Engineer"],
  MECH: ["Mechanical Engineer", "Design Engineer", "Quality Engineer"],
};

export default function RolePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const branch = searchParams.get("branch") || "Unknown";

  const roles = rolesByBranch[branch as keyof typeof rolesByBranch] || [];

  function handleSelect(role: string) {
    router.push(`/domain?branch=${branch}&role=${role}`);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Choose Your Role</h1>

      <p className="text-lg mb-8">
        Branch selected:{" "}
        <span className="font-semibold text-blue-400">{branch}</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => handleSelect(role)}
            className="bg-gray-800 border border-gray-700 px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-700 transition hover:scale-105 active:scale-95"
          >
            {role}
          </button>
        ))}
      </div>
    </main>
  );
}
