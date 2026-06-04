import type { Metadata } from "next";
import ClientRedirect from "@/components/ClientRedirect";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "A doctor-led, personalised process. Assessment first, then a program built around your exact condition — exercise, nutrition, and mind coaching integrated into one journey.",
};

// "How It Works" has been merged into the combined /approach page.
export default function HowItWorksPage() {
  return <ClientRedirect to="/approach#the-journey" />;
}
