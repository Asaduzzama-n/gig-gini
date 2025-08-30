
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { Header } from "@/components/navigation/Header";
import { OnboardingProvider } from "@/components/onboarding/OnboardingProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GiG Geni - Competitive Hiring Platform",
    template: "%s | GiG Geni"
  },
  description: "Transform your hiring process with GiG Geni's competitive platform. Connect talented professionals with innovative companies through skill-based competitions and challenges.",
  keywords: "hiring platform, competitive hiring, skill-based recruitment, talent acquisition, job competitions, developer challenges, remote hiring",
  authors: [{ name: "GiG Geni Team" }],
  creator: "GiG Geni",
  publisher: "GiG Geni",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://gigGeni.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'GiG Geni - Competitive Hiring Platform',
    description: 'Transform your hiring process with GiG Geni\'s competitive platform. Connect talented professionals with innovative companies through skill-based competitions and challenges.',
    siteName: 'GiG Geni',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GiG Geni - Competitive Hiring Platform',
    description: 'Transform your hiring process with GiG Geni\'s competitive platform. Connect talented professionals with innovative companies through skill-based competitions and challenges.',
    creator: '@gigGeni',
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
};




function LayoutContent({ children }: { children: React.ReactNode }) {


  return (
    <NotificationProvider>
      <OnboardingProvider>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        {/* <Footer /> */}
      </OnboardingProvider>
    </NotificationProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
