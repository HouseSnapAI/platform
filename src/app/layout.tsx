import type { Metadata } from "next";
import "./globals.css";
import '../styles/animations.css';
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "@/utils/theme";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import AnimatedTransition from "./AnimatedTransition";
import { ToastContainer } from 'react-toastify';

import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"

const josefin = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HouseSnapAI",
  description: "Snapshot of your Dream House",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"/>
      </head>
      <body className={`${josefin.className} overflow-hidden`}>
        <UserProvider>
          <ThemeProvider theme={theme}>
            <AnimatedTransition children={children} />
            <ToastContainer />
          </ThemeProvider>
        </UserProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}