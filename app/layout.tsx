import type { Metadata } from "next";
import { Schibsted_Grotesk, Martian_Mono, Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { cn } from "@/lib/utils";
import Particles from "@/components/LightRays";
import { Kolker_Brush} from 'next/font/google'

const kolkerBrush = Kolker_Brush({
  variable: "--font-kolker-brush",
  subsets: ["latin"],
  weight: "400",
});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RUKOMO dairy",
  description: "Welcome to RUKOMO dairy, your trusted source for fresh and high-quality dairy products. We are committed to providing our customers with the best milk, cheese, yogurt, and other dairy delights. Our products are sourced from local farms that prioritize animal welfare and sustainable practices. Experience the rich flavors and nutritional benefits of our dairy offerings, crafted with care and dedication to excellence. Join us on our journey to bring you the finest dairy products while supporting local communities and promoting a healthier lifestyle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("min-h-screen", "h-full", "antialiased", schibstedGrotesk.variable, martianMono.variable, kolkerBrush.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-screen relative overflow-hidden bg-background text-foreground">
        <div className="pointer-events-none absolute inset-0">
          <Particles
            particleColors={["#000000"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover
            alphaParticles={false}
            disableRotation={false}
            pixelRatio={1}
          />
        </div>

        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
