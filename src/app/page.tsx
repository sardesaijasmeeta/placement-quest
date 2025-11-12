"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Wait briefly before redirecting
    const timer = setTimeout(() => {
      router.push("/branch");
    }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center bg-black text-white text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <h1 className="text-5xl font-extrabold mb-4">Placement Quest</h1>
      <p className="text-gray-400 text-lg">
        Preparing your game...
      </p>
    </motion.div>
  );
}
