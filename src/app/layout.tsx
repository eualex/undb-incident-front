'use client';

import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/presentation/components/ui/toaster';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const helvetica = localFont({
  src: [
    {
      path: './fonts/helvetica/helvetica-regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/helvetica/helvetica-bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-helvetica',
});
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${helvetica.variable} font-sans`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
