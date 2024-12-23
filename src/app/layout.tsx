import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Headline from "@/components/layout/headline";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// Helvetica Neue

const helveticaBold = localFont({
  src: "./fonts/HelveticaNeueBold.otf",
  variable: "--font-helvetica-bold",
  weight: "100 900",
});

const helveticaHeavy = localFont({
  src: "./fonts/HelveticaNeueHeavy.otf",
  variable: "--font-helvetica-heavy",
  weight: "100 900",
});

const helveticaLight = localFont({
  src: "./fonts/HelveticaNeueLight.otf",
  variable: "--font-helvetica-light",
  weight: "100 900",
});

const helveticaMedium = localFont({
  src: "./fonts/HelveticaNeueMedium.otf",
  variable: "--font-helvetica-medium",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${helveticaBold.variable} 
        ${helveticaHeavy.variable} 
        ${helveticaLight.variable} 
        ${helveticaMedium.variable}
        antialiased overflow-x-hidden`}
        cz-shortcut-listen="true"
      >
        <Headline />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
