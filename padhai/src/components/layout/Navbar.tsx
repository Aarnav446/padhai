'use client';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';

export default function NavBar() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [hasMounted, setHasMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  // 🔥 Fix hydration issue
  if (!hasMounted) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-3 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-yellow-400">PadhAI</Link>

      <div className="flex items-center gap-4 relative">
        {user ? (
          <>
            <Link
              href="/dashboard"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700 transition"
            >
              Dashboard
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="text-sm font-medium px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 transition"
              >
                {user.email.split('@')[0]}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-100 dark:hover:bg-red-900 dark:hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link
            href="/auth"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-black transition"
          >
            Login
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="text-sm px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:scale-105 transition"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}
