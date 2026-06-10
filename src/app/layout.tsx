import type { Metadata } from "next";
import { Inter, Libre_Franklin, Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";

/**
 * Fonts:
 *   • Geist          — display headings (closest free analog to Neue Montreal
 *                      used on myhealthprac.com — modern grotesk, editorial)
 *   • Inter          — body text (clinical, neutral, matches live brand ref)
 *   • Libre Franklin — brand wordmark only (RECONNECT lockup)
 */
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre-franklin",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Reconnect Wellness | Joint Pain & Arthritis Exercise Program",
    template: "%s | Reconnect Wellness",
  },
  description:
    "Doctor-designed strength & nutrition program for joint pain, arthritis, and bone health. Personalized, evidence-backed exercises.",
  keywords: [
    "arthritis exercise program",
    "knee pain strength training",
    "rheumatologist-led fitness India",
    "osteoporosis exercise",
    "back pain exercise",
    "disc bulge exercise",
    "joint pain treatment without surgery",
    "strength training for arthritis",
    "bone health program",
  ],
  openGraph: {
    title: "Reconnect Wellness | Stronger Joints. Denser Bones.",
    description:
      "Doctor-designed strength & nutrition program for joint pain, arthritis, and bone health. Personalized, evidence-backed.",
    type: "website",
    locale: "en_IN",
    siteName: "Reconnect Wellness",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Reconnect Wellness - Joint Pain & Arthritis Exercise Program",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reconnect Wellness | Joint Pain & Arthritis Relief",
    description:
      "Doctor-designed strength & nutrition program for arthritis, joint pain, and bone health.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geist.variable} ${inter.variable} ${libreFranklin.variable}`}
    >
      <head>
        <SchemaMarkup />
        {/* Google Material Symbols — used for the approach-page care-model icons. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
      </head>
      <body className="min-h-dvh flex flex-col bg-bone text-ink antialiased overflow-x-hidden">
        <SmoothScroll>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
