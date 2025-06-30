'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserFlashcards } from '@/lib/flashcards';
import { getUserNotes } from '@/lib/notes';
import Link from 'next/link';
import { Brain, NotebookPen } from 'lucide-react';

interface Flashcard {
  id: string;
  title: string;
  topic: string;
  created_at: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    } else if (user) {
      fetchData();
    }
  }, [user, loading]);

  const fetchData = async () => {
    try {
      const flash = await getUserFlashcards(user!.id);
      const noteData = await getUserNotes(user!.id);
      setFlashcards(flash);
      setNotes(noteData);
    } catch (err) {
      console.error('Error loading dashboard data', err);
    }
  };

  const extractName = (email: string) => {
    const username = email.split('@')[0];
    return username.split(/[0-9]/)[0]; // Rahul123 → Rahul
  };

  if (loading || !user)
    return <div className="p-6 text-center text-gray-500">Loading...</div>;

  const studentName = extractName(user.email ?? 'Learner');

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Welcome, {studentName} 👋
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="AI Flashcards"
          value={flashcards.length.toString()}
          icon={<Brain className="w-6 h-6" />}
          bgColor="blue"
        />
        <StatCard
          title="Notes Saved"
          value={notes.length.toString()}
          icon={<NotebookPen className="w-6 h-6" />}
          bgColor="green"
        />
      </div>

      {/* Feature Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Brain className="text-yellow-400 w-7 h-7" />}
          title="AI Flashcards"
          desc="Generate flashcards which will make you learn any concept easily."
          href="/flashcards"
        />
        <FeatureCard
          icon={<NotebookPen className="text-green-500 w-7 h-7" />}
          title="Smart Notes"
          desc="Write and store notes — anytime, anywhere."
          href="/notes"
        />
      </div>

      {/* Recent Flashcards */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          📚 Recent Flashcards
        </h2>
        <ul className="space-y-3">
          {flashcards.length > 0 ? (
            flashcards.slice(0, 5).map((card) => (
              <li
                key={card.id}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
              >
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {card.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Topic: {card.topic}
                </p>
                <p className="text-xs text-gray-400">
                  Created at: {new Date(card.created_at).toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">
              No flashcards yet. Try creating one!
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}

// StatCard with light/dark support
const StatCard = ({
  title,
  value,
  icon,
  bgColor,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: 'blue' | 'green';
}) => {
  const colorClasses =
    bgColor === 'green'
      ? 'bg-green-100 text-green-900 dark:bg-green-800 dark:text-green-100'
      : bgColor === 'blue'
      ? 'bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-blue-100'
      : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white';

  return (
    <div className={`p-6 rounded-xl shadow-md ${colorClasses}`}>
      <div className="flex items-center gap-4">
        <div className="text-3xl">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

// FeatureCard links to each tool
const FeatureCard = ({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) => (
  <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow flex flex-col justify-between">
    <div>
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
        {icon}
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{desc}</p>
    </div>
    <Link
      href={href}
      className="mt-4 inline-block px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
    >
      Go to {title}
    </Link>
  </div>
);
