import type { Metadata } from "next";
import { Outfit, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const mono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = "https://dardika.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Dardika | AI Engineer & Creative Technologist",
  description:
    "Portfolio of Dardika (Dard1ka), building intelligent systems, interfaces, and real-world automation. AI, LLM, IoT, computer vision, and web applications.",
  keywords: ["Dardika", "Dard1ka", "AI Engineer", "Full-Stack Developer", "LLM", "IoT", "Computer Vision", "Portfolio"],
  authors: [{ name: "Dardika" }],
  openGraph: {
    title: "Dardika | AI Engineer & Creative Technologist",
    description: "I build intelligent systems, interfaces, and real-world automation.",
    url: siteUrl,
    siteName: "Dardika",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dardika | AI Engineer & Creative Technologist",
    description: "I build intelligent systems, interfaces, and real-world automation.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
