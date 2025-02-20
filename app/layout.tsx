import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ 
  subsets: ['latin'], 
  weight: ["400", "500", "600"],
  fallback: ['sans-serif'],

});

export const metadata: Metadata = {
  title: "Movie Watchlist",
  description: "Find and watchlist your favorite movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`mx-auto max-w-[34.375rem] w-full flex flex-col items-center ${inter.className}`}>
        {children}
      </body>
    </html>
  );
}
