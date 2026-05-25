import './globals.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Lobster Tavern',
  description: 'Luxury seafood dining experience.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
