"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const dynamic = "force-dynamic";

function GamePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const branch = searchParams.get("branch") || "";
  const domain = searchParams.get("domain") || "";
  const level = searchParams.get("level") || "";
  const count = parseInt(searchParams.get("count") || "5");

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadQuestions() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`/api/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain, level, count }),
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();

        if (Array.isArray(data.questions)) {
          setQuestions(data.questions);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err: any) {
        console.error("Error loading questions:", err);
        setError("⚠️ Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (domain && level && count) {
      loadQuestions();
    }
  }, [domain, level, count]);

  function handleAnswer(opt: string) {
    if (!questions[currentQ]) return;
    const correct = questions[currentQ].answer.trim().toLowerCase();
    const chosen = opt.trim().toLowerCase();
    const isCorrect = chosen === correct;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct answer: ${questions[currentQ].answer}`);
    }

    setSelected(opt);
  }

  function handleNext() {
    setSelected(null);
    setFeedback("");
    if (currentQ + 1 < questions.length) {
      setCurrentQ((q) => q + 1);
    } else {
      router.push(`/results?score=${score}&total=${questions.length}`);
    }
  }

  if (loading) return <div className="text-white p-6">Loading questions...</div>;
  if (error) return <div className="text-red-400 p-6">{error}</div>;
  if (questions.length === 0)
    return <div className="text-white p-6">No questions available.</div>;

  const current = questions[currentQ];

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4 font-bold text-blue-400">
        {domain} ({level}) Quiz
      </h1>

      <div className="text-lg mb-2">
        Question {currentQ + 1} of {questions.length}
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <p className="text-xl mb-4">{current.question}</p>

        <div className="space-y-3">
          {current.options.map((opt: string, i: number) => {
            const isSelected = selected === opt;
            const isCorrect =
              isSelected &&
              opt.trim().toLowerCase() ===
                current.answer.trim().toLowerCase();

            return (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
                className={`block w-full text-left px-4 py-2 rounded-lg border transition-all duration-300 ${
                  selected
                    ? isCorrect
                      ? "bg-green-600 border-green-600"
                      : "bg-red-600 border-red-600"
                    : "bg-gray-800 hover:bg-gray-700 border-gray-700"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {feedback && (
          <p
            className={`mt-4 text-lg transition-opacity duration-500 ${
              feedback.includes("Correct") ? "text-green-400" : "text-red-400"
            }`}
          >
            {feedback}
          </p>
        )}

        {selected && (
          <button
            onClick={handleNext}
            className="mt-6 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300"
          >
            {currentQ + 1 < questions.length ? "Next →" : "Finish 🎉"}
          </button>
        )}
      </div>

      <div className="mt-4 text-lg">
        Score: {score} / {questions.length}
      </div>
    </div>
  );
}

export default function GamePage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Loading game...</div>}>
      <GamePageInner />
    </Suspense>
  );
}
