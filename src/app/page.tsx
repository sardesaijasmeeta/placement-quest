"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to the first page in flow
    router.push("/branch");
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white text-2xl">
      Redirecting to Placement Quest...
    </div>
  );
}
