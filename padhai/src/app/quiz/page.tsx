'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { generateQuizQuestions } from '@/lib/quiz';

export default function QuizPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [loading, user, router]);

  const handleGenerate = async () => {
    setLoadingQuiz(true);
    setQuestions([]);
    setFinished(false);
    setCurrent(0);
    setScore(0);
    setSelected(null);

    try {
      const data = await generateQuizQuestions(topic);
      setQuestions(data);
    } catch (err) {
      console.error(err);
    }
    setLoadingQuiz(false);
  };

  const handleAnswer = (index: number) => {
    setSelected(index);
    const isCorrect = index === questions[current].correctAnswer;
    if (isCorrect) setScore((prev) => prev + 1);
    setTimeout(() => {
      setSelected(null);
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
      } else {
        setFinished(true);
      }
    }, 1000);
  };

  if (loading || !user) {
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-tr from-blue-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-blue-700 dark:text-yellow-300">🔥 AI Quiz Challenge</h1>

        <div className="flex gap-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic (e.g. Physics)"
            className="flex-1 px-4 py-3 border border-blue-300 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          />
          <button
            onClick={handleGenerate}
            disabled={loadingQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loadingQuiz ? 'Generating...' : 'Start Quiz'}
          </button>
        </div>

        {finished ? (
          <div className="text-center mt-10 space-y-4">
            <h2 className="text-2xl font-bold">Quiz Finished!</h2>
            <p className="text-lg">Score: {score} / {questions.length}</p>
            <button
              onClick={() => {
                setQuestions([]);
                setFinished(false);
                setTopic('');
              }}
              className="mt-4 bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg"
            >
              Try Another
            </button>
          </div>
        ) : questions.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">
              Q{current + 1}: {questions[current].question}
            </h2>
            <div className="grid gap-3">
              {questions[current].options.map((opt: string, i: number) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className={`px-4 py-2 rounded-lg text-left transition-all duration-300 ${
                    selected === null
                      ? 'bg-white dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600'
                      : i === questions[current].correctAnswer
                      ? 'bg-green-400 text-white'
                      : i === selected
                      ? 'bg-red-400 text-white'
                      : 'bg-gray-100 dark:bg-gray-800'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {selected !== null && (
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                {questions[current].explanation}
                <br />
                🧠 <strong>Roast:</strong> {questions[current].roast}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
