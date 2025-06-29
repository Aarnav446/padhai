// src/components/ui/TopNav.tsx
import React from 'react';

const TopNav: React.FC = () => {
  return (
    <div className="bg-primary-500 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">PadhAI Dashboard</h1>
      <div className="flex space-x-4">
        <button className="bg-secondary-500 px-4 py-2 rounded-full hover:bg-secondary-600 transition">Profile</button>
        <button className="bg-secondary-500 px-4 py-2 rounded-full hover:bg-secondary-600 transition">Log out</button>
      </div>
    </div>
  );
};

export default TopNav;
