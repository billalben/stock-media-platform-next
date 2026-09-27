import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import { SITE_URL } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-work-sans",
});

const DESCRIPTION =
  "Explore our exceptional collection of high-quality stock photos and videos powered by Pexels.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Pixstock - A large stock library",
    template: "%s | Pixstock",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Pixstock",
    title: "Pixstock - A large stock library",
    description: DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Pixstock - A large stock library",
    description: DESCRIPTION,
  },
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
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <div id="main-wrapper" className="flex-1 flex flex-col xl:ml-90">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
