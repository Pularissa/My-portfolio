import "./globals.css";
import { Kolker_Brush } from "next/font/google";

const kolker = Kolker_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-kolker",
});

export const metadata = {
  title: "PriPo Portfolio",
  description: "Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={kolker.variable}>
        {children}
      </body>
    </html>
  );
}