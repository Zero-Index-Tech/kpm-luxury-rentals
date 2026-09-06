import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KPM Luxe Rentals — Three Website Directions",
  description: "Three brand-led, conversion-focused website concepts for KPM Luxe Rentals.",
  other: { "codex-preview": "development" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
