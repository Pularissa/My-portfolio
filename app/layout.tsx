import "./globals.css";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import ScrollProgress from "../components/ScrollProgress";

// Cormorant Garamond — elegant, organic serif. Feels human, editorial, not AI.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

// DM Sans — geometric humanist sans. Friendly, readable, not robotic.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Prisca Larisse — Software Developer",
  description: "Portfolio of Prisca Larisse, a Software Programming & Embedded Systems student at Rwanda Coding Academy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon — direct link tag is the most reliable method */}
        <link rel="icon" type="image/png" href="/images/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
