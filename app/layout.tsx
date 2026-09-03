import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalEffects from "@/components/GlobalEffects";

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rumesh Babu — Full-Stack Product Developer",
  description:
    "Full-stack product developer building modern SaaS, web applications and digital products across frontend, backend, database and deployment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bodyFont.variable} data-theme="red" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=t==='black'?'black':'red'}catch(e){document.documentElement.dataset.theme='red'}})();`,
          }}
        />
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
