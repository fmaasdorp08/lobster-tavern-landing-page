import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lobster Tavern Johannesburg',
  description: 'Premium seafood in Johannesburg. Order on WhatsApp or Uber Eats.',
  openGraph: {
    title: 'Lobster Tavern Johannesburg',
    description: 'Flame-grilled lobster and premium platters. Order now.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
