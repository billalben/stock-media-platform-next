import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Pixstock - A large stock library",
    template: "%s | Pixstock",
  },
  description:
    "Explore our exceptional collection of high-quality stock photos and videos powered by Pexels.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=optional"
        />
      </head>
      <body className="min-h-screen min-h-svh flex flex-col">
        <ThemeProvider>
          <Header />
          <div className="flex-1 flex flex-col xl:ml-[360px]">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
