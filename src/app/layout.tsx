import type { Metadata } from "next";
import { Radio_Canada, Inter } from "next/font/google";
import "./globals.css";

const radioCanada = Radio_Canada({
  subsets: ["latin"],
  variable: "--font-radio-canada",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Best Online Casino Canada 2025 | myHighRoller Canada",
    template: "%s | myHighRoller Canada"
  },
  description: "🏆 #1 Independent Canadian Online Casino Reviews 2025. Find trusted sites, exclusive bonuses, fast payouts, and expert reviews. Play responsibly at licensed casinos.",
  keywords: "online casino Canada, best Canadian casinos, casino bonuses Canada, online gambling Canada, casino reviews, slots Canada, live dealer games, Interac casinos",
  authors: [{ name: "myHighRoller Canada Team" }],
  creator: "myHighRoller Canada",
  publisher: "myHighRoller Canada",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://myhighroller.ca'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Best Online Casino Canada 2025 | Independent Reviews",
    description: "🏆 #1 Independent Canadian Online Casino Reviews 2025. Find trusted sites, exclusive bonuses, fast payouts, and expert reviews.",
    url: '/',
    siteName: 'myHighRoller Canada',
    locale: 'en_CA',
    type: 'website',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'myHighRoller Canada - Best Online Casino Reviews',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Best Online Casino Canada 2025 | myHighRoller Canada",
    description: "🏆 Independent Canadian Online Casino Reviews. Find trusted sites & exclusive bonuses.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_ID,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${radioCanada.variable} ${inter.variable} antialiased font-radio-canada`}
      >
        {children}
      </body>
    </html>
  );
}
