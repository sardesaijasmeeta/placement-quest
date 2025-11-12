"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

function DomainPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const branch = searchParams.get("branch") || "";
  const role = searchParams.get("role") || "";

  const domains = ["Verbal", "Technical", "Behavioural"];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Loaded domain page:", { branch, role });
  }, [branch, role]);

  function handleSelect(domain: string) {
    setLoading(true);
    router.push(
      `/level?branch=${branch}&role=${role}&domain=${domain}`
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Select Your Domain
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {domains.map((domain) => (
          <button
            key={domain}
            onClick={() => handleSelect(domain)}
            disabled={loading}
            className="bg-gray-800 hover:bg-gray-700 border border-gray-700 shadow-md px-8 py-4 rounded-xl text-xl font-semibold transition-all hover:scale-105 active:scale-95"
          >
            {domain}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function DomainPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading domains...</div>}>
      <DomainPageInner />
    </Suspense>
  );
}
