// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { Poppins } from 'next/font/google';
import NavBar from '@/components/layout/NavBar';

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
    <html lang="en" suppressHydrationWarning>

      
     <body className={`${poppins.className} pt-16 bg-white dark:bg-black`}>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NavBar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
