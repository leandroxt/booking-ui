import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Booking UI',
  description: 'Best tool for booking management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="border-b-2 border-b-gray-200 py-6 mb-10">
          <div className="container mx-auto  text-3xl font-bold">
            Booking UI
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
