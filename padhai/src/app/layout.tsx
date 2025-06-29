// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Poppins } from 'next/font/google';
import NavBar from '@/components/ui/NavBar';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

export const metadata = {
  title: 'PadhAI',
  description: 'Learn through AI-powered flashcards and memes',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="font-poppins bg-white text-black dark:bg-[#0b1222] dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
