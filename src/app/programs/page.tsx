import type { Metadata } from "next";
import ClientRedirect from "@/components/ClientRedirect";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Three condition-focused tracks — Prevent, Manage, Strengthen — each built around a personalised medical assessment. Doctor-led strength training for joints, spine, and bones.",
};

// The Programs overview has been merged into the combined /approach page.
export default function ProgramsPage() {
  return <ClientRedirect to="/approach" />;
}
