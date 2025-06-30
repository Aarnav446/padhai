'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Your Profile</h1>
      <p className="text-lg text-gray-800 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>

      <button
        onClick={signOut}
        className="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;
