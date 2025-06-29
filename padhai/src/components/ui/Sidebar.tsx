// src/components/ui/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
  return (
    <div className="bg-primary-700 text-white w-64 min-h-screen p-4">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Menu</h2>
        <ul className="space-y-4">
          <li><Link href="/dashboard" className="hover:text-secondary-500">Dashboard</Link></li>
          <li><Link href="/flashcards" className="hover:text-secondary-500">Flashcards</Link></li>
          <li><Link href="/quiz" className="hover:text-secondary-500">Quiz</Link></li>
          <li><Link href="/about" className="hover:text-secondary-500">About</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
