import "./globals.css";
import { Cinzel, Poppins } from "next/font/google";
import ScrollProgress from "../components/ScrollProgress";
import SmoothScroll from "../components/SmoothScroll";

// Cinzel — elegant, classical serif. Cinzel is uppercase-first,
// perfect for PRISCA, section titles, and the logo mark.
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-serif",
});

// Poppins — modern, geometric humanist. Clean and very readable
// for body text, buttons, nav, forms, and cards.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Prisca Larissa — Software Developer",
  description: "Portfolio of Prisca Larissa, a Software Programming & Embedded Systems student at Rwanda Coding Academy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon — direct link tag is the most reliable method */}
        <link rel="icon" type="image/png" href="/images/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className={`${cinzel.variable} ${poppins.variable}`}>
        <SmoothScroll />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
