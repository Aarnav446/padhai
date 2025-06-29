'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="mx-auto my-4 w-[95%] md:w-[90%] bg-white dark:bg-gray-800 text-black dark:text-white px-6 py-4 flex items-center justify-between rounded-full shadow-md transition-all duration-300">
      <div className="text-xl font-bold text-yellow-500">PadhAI</div>

      <div className="flex items-center gap-6">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/about" className="hover:underline">About Us</Link>
        <Link href="/subjects" className="hover:underline">Subjects</Link>

        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
