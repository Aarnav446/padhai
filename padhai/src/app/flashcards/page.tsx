'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { generateFlashcards } from '@/lib/gemini';
import { saveFlashcard } from '@/lib/flashcards';

interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashcardsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [topic, setTopic] = useState('');
  const [loadingGen, setLoadingGen] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoadingGen(true);
    setError('');
    setCards([]);

    try {
      const result = await generateFlashcards(topic);
      const flashcards = result.flashcards || [];
      setCards(flashcards);

      for (const card of flashcards) {
        await saveFlashcard({
          topic,
          title: card.question,
          content: card.answer,
          explanation: '',
          image_url: '',
        });
      }
    } catch (err: any) {
      console.error('Error generating/saving:', err.message);
      setError('⚠️ Failed to generate flashcards.');
    } finally {
      setLoadingGen(false);
    }
  };

  if (loading || !user) return <div className="p-6 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-yellow-400">
        ✨ AI Flashcard Generator
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Enter topic (e.g. Mitochondria)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="flex-1 px-4 py-3 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
        />
        <button
          onClick={handleGenerate}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={loadingGen}
        >
          {loadingGen ? 'Generating...' : 'Generate'}
        </button>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}

      {cards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group perspective w-full h-64"
            >
              <div className="card-container w-full h-full">
                {/* Front */}
                <div className="card-front bg-blue-600 text-white flex items-center justify-center text-xl font-semibold">
                  {card.question}
                </div>

                {/* Back */}
                <div className="card-back bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center text-lg p-4">
                  {card.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
