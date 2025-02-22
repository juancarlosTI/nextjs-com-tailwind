import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight:["100","200","300","400","500", "600", "700", "800", "900"],
  subsets: ["latin"]
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}`}
      >
        layout
        {children}
      </body>
    </html>
  );
}
