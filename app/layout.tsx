import "./globals.css";
import { Space_Grotesk, Manrope, IBM_Plex_Mono } from "next/font/google";
import ScrollProgress from "../components/ScrollProgress";
import ScrollObserver from "../components/ScrollObserver";
import LenisProvider  from "../components/LenisProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

const ibmMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-mono",
});

export const metadata = {
  title: "Prisca Larissa — Software Developer",
  description: "Portfolio of Prisca Larissa, a Software Programming & Embedded Systems student at Rwanda Coding Academy.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/images/logo.png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
      </head>
      <body className={`${spaceGrotesk.variable} ${manrope.variable} ${ibmMono.variable}`}>
        <LenisProvider>
          <ScrollProgress />
          <ScrollObserver />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
