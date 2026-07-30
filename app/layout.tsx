import type { Metadata } from "next";
import { Bricolage_Grotesque, Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import GlobalEffects from "@/components/GlobalEffects";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rumesh Babu — UX/UI Designer",
  description:
    "I design mobile & SaaS products that users love — 11+ years turning complex systems into things people genuinely enjoy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='24' fill='%23ef1206'/%3E%3Ctext x='50' y='50' font-family='Georgia,serif' font-weight='800' font-size='58' fill='%2317150f' text-anchor='middle' dominant-baseline='central'%3E11%C2%B0%3C/text%3E%3C/svg%3E"
        />
      </head>
      <body>
        <GlobalEffects />
        {children}
      </body>
    </html>
  );
}
