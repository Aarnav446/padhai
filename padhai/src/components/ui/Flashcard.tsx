'use client';
import { useState } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
}

export function Flashcard({ question, answer }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="w-80 h-48 perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full bg-white dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-lg backface-hidden p-6 flex items-center justify-center font-bold text-lg">
          {question}
        </div>

        {/* Back */}
        <div className="absolute w-full h-full bg-blue-600 text-white rounded-xl shadow-lg backface-hidden p-6 flex items-center justify-center rotate-y-180">
          {answer}
        </div>
      </div>
    </div>
  );
}
