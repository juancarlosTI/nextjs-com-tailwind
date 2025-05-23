import "./globals.css";

import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import Providers from "./orders/store/components/providers";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});


export const metadata: Metadata = {
  title: "FSW Donalds",
  description: "Bora finalizar esse projeto lindo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
