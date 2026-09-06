import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KPM Luxe Rentals | Website Concept Directions",
  description: "Premium website concept directions for KPM Luxe Rentals with service paths, fleet browsing and AI concierge flows.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
