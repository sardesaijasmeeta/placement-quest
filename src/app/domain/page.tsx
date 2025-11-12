"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = "force-dynamic";

function DomainPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const branch = searchParams.get("branch") || "";
  const domain = searchParams.get("domain") || "";

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Loaded domain page:", { branch, domain });
  }, [branch, domain]);

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Select Your Domain</h1>
      <p>Branch: {branch}</p>
      <p>Domain: {domain}</p>

      <button
        onClick={() => router.push(`/game?branch=${branch}&domain=${domain}`)}
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Continue →
      </button>
    </div>
  );
}

export default function DomainPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading...</div>}>
      <DomainPageInner />
    </Suspense>
  );
}
