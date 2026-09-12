import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { PortalProvider } from '@/context/PortalContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'MAITRI 2.0 - Single Window Investor Portal | Govt of Maharashtra',
  description: 'AI-Powered Integrated Business Approval & Compliance Operating System, Government of Maharashtra',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900">
        <LanguageProvider>
          <PortalProvider>
            {children}
          </PortalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
