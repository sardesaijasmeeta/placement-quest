"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
//import confetti from "canvas-confetti";




export default function GamePage() {
  const searchParams = useSearchParams();
  const branch = searchParams.get("branch") || "IT";
  const role = searchParams.get("role") || "Software Engineer";
  const domain = searchParams.get("domain") || "Technical";
  const level = searchParams.get("level") || "Easy";
  const count = searchParams.get("count") || "5";
  const [isGameOver, setIsGameOver] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const router = useRouter();


  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      const res = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ branch, role, domain, level, count }),
      });
      const data = await res.json();
      setQuestions(data.questions || []);
      setLoading(false);
    }
    fetchQuestions();
  }, [branch, role, domain, level, count]);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center text-xl text-white">
        Loading questions...
      </div>
    );

  const current = questions[currentQ];

  // inside GamePage component, replace handleAnswer with:

function normalizeText(s: string | null) {
  return s?.trim().toLowerCase() ?? "";
}

function getAnswerTextFromModel(answerField: string, options: string[]) {
  // If model returned a single letter like "A" or "b", map to option text
  const maybeLetter = answerField?.trim().toUpperCase();
  if (maybeLetter && /^[A-D]$/.test(maybeLetter)) {
    const idx = maybeLetter.charCodeAt(0) - "A".charCodeAt(0);
    return options[idx] ?? "";
  }

  // Sometimes answer comes like "Option C" or "C. Java" — try extract letter
  const letterMatch = answerField.match(/[A-D]/i);
  if (letterMatch) {
    const idx = letterMatch[0].toUpperCase().charCodeAt(0) - "A".charCodeAt(0);
    if (options[idx]) return options[idx];
  }

  // Else assume it's full option text already
  return answerField.trim();
}

function handleAnswer(option: string) {
  if (selected) return; // prevent double-click
  setSelected(option);

  // normalize options and model answer
  const optText = normalizeText(option);

  // current.answer might be letter or full text
  const modelAnswerRaw = String(current.answer || "");
  const modelAnswerText = normalizeText(
    getAnswerTextFromModel(modelAnswerRaw, current.options)
  );

  const isCorrect = optText === modelAnswerText;

  if (isCorrect) {
    setScore((s) => s + 1);
    setFeedback("✅ Correct!");
  } else {
    // show explanation and mark incorrect
    setFeedback(`❌ Incorrect. ${current.explanation || ""}`);
  }
}


  function handleNext() {
  setSelected(null);
  setFeedback("");
  if (currentQ + 1 < questions.length) {
    setCurrentQ((q) => q + 1);
  } else {
    setIsGameOver(true);
  }
}


  return (
  <div className="min-h-screen bg-black text-white p-6">
    {!isGameOver ? (
      <>
        <h1 className="text-2xl mb-4 font-bold">
          {domain} ({level}) Quiz
        </h1>
        <div className="text-lg mb-2">
          Question {currentQ + 1} of {questions.length}
        </div>
        <div className="bg-gray-900 p-4 rounded-lg mb-4">
          <p className="text-xl mb-3">{current.question}</p>
          <div className="space-y-2">
            {current.options.map((opt: string, i: number) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                disabled={!!selected}
                className={`block w-full text-left p-2 rounded-lg border ${
                  selected === opt
                    ? feedback.includes("Correct")
                      ? "bg-green-600"
                      : "bg-red-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {feedback && (
          <p
            className={`mt-2 text-lg transition-opacity duration-500 ${
              feedback.includes("Correct")
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {feedback}
          </p>
        )}

        <button
          onClick={handleNext}
          className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Next →
        </button>

        <div className="mt-4 text-lg">Score: {score}</div>
      </>
    ) : (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-white mb-4">🎉 Game Over!</h2>
        <p className="text-xl text-gray-300">
          You scored{" "}
          <span className="text-blue-400 font-semibold">
            {score} / {questions.length}
          </span>
        </p>

        <button
          onClick={() => router.push(`/branch?branch=${branch}`)}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
        >
          🔁 Play Again
        </button>
      </div>
    )}
  </div>
);
}