import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "AI job searcher",
  description: "Find your dream software engineering job is this strange job market",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
