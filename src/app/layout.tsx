import type { Metadata } from "next";
import { Inter, Libre_Franklin, Geist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
      "Reconnect Wellness | Doctor-Led Strength Training for Joint Pain, Arthritis & Bone Health",
    template: "%s | Reconnect Wellness",
  },
  description:
    "A personalised, rheumatologist-designed strength and nutrition programme for joint pain, arthritis, back & disc issues, and osteoporosis. Doctor-led, not generic workouts.",
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
    title:
      "Reconnect Wellness | Stronger Joints. Denser Bones. A Life Without Pain.",
    description:
      "A personalised, doctor-designed strength and nutrition programme for joint pain, arthritis, and osteoporosis.",
    type: "website",
    locale: "en_IN",
    siteName: "Reconnect Wellness",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Reconnect Wellness | Doctor-Led Joint & Bone Health Programs",
    description:
      "Personalised strength training designed by a rheumatologist for joint pain, arthritis, and bone health.",
  },
  robots: { index: true, follow: true },
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
