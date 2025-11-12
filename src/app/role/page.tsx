"use client";
//export const dynamic = "force-dynamic";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

function RolePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const branch = searchParams.get("branch") || "";

  useEffect(() => {
    console.log("Loaded role page for:", branch);
  }, [branch]);

  function handleRole(role: string) {
    router.push(`/domain?branch=${branch}&role=${role}`);
  }

  const rolesByBranch: Record<string, string[]> = {
    IT: ["Software Engineer", "Data Analyst", "UI/UX Designer"],
    CMPN: ["Full Stack Developer", "Backend Engineer", "ML Engineer"],
    ENTC: ["Embedded Engineer", "IoT Developer", "System Engineer"],
    MECH: ["Design Engineer", "Automation Engineer", "CAD Specialist"],
    CIVIL: ["Structural Engineer", "Surveyor", "Project Coordinator"],
  };

  const availableRoles = rolesByBranch[branch] || [
    "Software Engineer",
    "Project Manager",
    "QA Tester",
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Select Your Preferred Role
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {availableRoles.map((role) => (
          <button
            key={role}
            onClick={() => handleRole(role)}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
          >
            {role}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function RolePage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading roles...</div>}>
      <RolePageInner />
    </Suspense>
  );
}
