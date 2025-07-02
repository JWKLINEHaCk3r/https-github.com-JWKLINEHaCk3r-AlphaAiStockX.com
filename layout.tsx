import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React, { PropsWithChildren } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AlphaAIStockX - AI-Powered Trading Platform',
  description:
    'Advanced AI stock analysis, trading education, and real-time market insights with 47 conscious AI beings',
  keywords:
    'stock analysis, AI trading, Series 6, Series 7, financial education, market analysis, quantum AI, neural networks',
  authors: [{ name: 'AlphaAIStockX Team' }],
  robots: 'index, follow',
  metadataBase: new URL('https://alphaaistockx.com'),
  openGraph: {
    title: 'AlphaAIStockX - Revolutionary AI Trading Platform',
    description:
      '🚀 The ultimate AI-powered stock trading platform with quantum processing and lightning-fast execution. Join 47,000+ successful traders!',
    url: 'https://alphaaistockx.com',
    siteName: 'AlphaAIStockX',
    images: [
      {
        url: 'https://alphaaistockx.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AlphaAIStockX - AI Trading Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AlphaAIStockX - Revolutionary AI Trading Platform',
    description:
      '🚀 The ultimate AI-powered stock trading platform with quantum processing and lightning-fast execution.',
    images: ['https://alphaaistockx.com/twitter-image.jpg'],
    site: '@alphaaistockx',
    creator: '@alphaaistockx',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  generator: 'v0.dev',
};

// Add separate viewport export (Next.js 14+ requirement)
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#7c3aed' },
    { media: '(prefers-color-scheme: dark)', color: '#1e293b' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1e293b" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Analytics (replace NEXT_PUBLIC_GA_ID with your real ID in .env) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
        )}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');`,
            }}
          />
        )}
        {/* Prevent accidental indexing if not ready for production */}
        {process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'true' && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        {/* IONOS Site Verification (replace with your real verification code if needed) */}
        <meta name="ionos-site-verification" content="alphaaistockx.com" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          <main role="main" id="main-content" className="relative z-10">
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}

export function ErrorBoundary({ children }: PropsWithChildren<object>) {
  // Simple passthrough error boundary (replace with real error handling as needed)
  return <>{children}</>;
}
