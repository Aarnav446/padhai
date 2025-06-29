'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen font-poppins bg-white text-black dark:bg-[#0b1222] dark:text-white transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-16 px-8 grid md:grid-cols-2 items-center gap-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Best Learning <span className="text-yellow-400">Education Platform</span> in The World
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Learn topics easier, smarter, and with AI-generated meme flashcards. Improve recall,
            reduce boredom, and make concepts stick forever.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/auth"
              className="btn-primary bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
            >
              Register
            </Link>
            <Link
              href="/auth"
              className="btn-secondary bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-black dark:text-white font-medium py-2 px-6 rounded-lg"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="relative">
          <Image
            src="/images/hero.jpg"
            alt="Students learning"
            width={500}
            height={350}
            className="rounded-xl"
          />
          <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-md p-4 rounded-xl shadow-md">
            <ul className="list-disc ml-4 text-sm">
              <li>🎓 Get AI Generated FlashCards</li>
              <li>📝 One place for your Notes</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#f9fafb] dark:bg-[#141b2d] py-16 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">Why Choose Us</h2>
            <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
              Choosing <span className="font-semibold text-blue-600 dark:text-blue-400">PadhAI</span> is the best option as we offer different features like getting AI Generated Flashcards which makes you learn any difficult topic in one go. We also offer the ability to store notes and access them anytime and anywhere.
            </p>
          </div>
          <div className="bg-gray-200 dark:bg-gray-700 h-60 w-full rounded-xl flex items-center justify-center text-gray-500 dark:text-white">
            Any Good Image can paste here
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; 2025 PadhAI. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="text-sm hover:underline">Home</Link>
            <Link href="#" className="text-sm hover:underline">Support</Link>
            <Link href="#" className="text-sm hover:underline">Company</Link>
            <Link href="#" className="text-sm hover:underline">Legal</Link>
            <Link href="#" className="text-sm hover:underline">Join Us</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
