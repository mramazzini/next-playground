"use client";
import { Inter } from "next/font/google";
import "./globals.css";
// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
import { Provider } from "react-redux";
import makeStore from "@/store/store";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Next Playground",
    default: "Next Playground",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* charset */}
        <meta charSet="UTF-8" />
      </head>
      <body
        className={`${inter.className} w-screen flex flex-col items-center  `}
      >
        <Provider store={makeStore()}>
          {children}
          {/* <SpeedInsights /> <Analytics /> */}
        </Provider>
      </body>
    </html>
  );
}
