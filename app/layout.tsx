import "./globals.css";
import Hero from "../components/Hero";

export const metadata = {
  title: "Prisca Portfolio",
  description: "Portfolio Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <Hero />
          {children}
        </div>
      </body>
    </html>
  );
}