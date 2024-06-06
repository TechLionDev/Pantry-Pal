import type { Metadata } from "next";
import { Rubik as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import {
  CheckCircle2Icon,
  CircleXIcon,
  InfoIcon,
  LoaderCircleIcon,
  TriangleAlertIcon
} from "lucide-react";
import Nav from "@/components/nav";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Pantry Pal - Home",
  description:
    "Pantry Pal is a recipe search engine that helps you find recipes based on the ingredients you have in your pantry."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <main>{children}</main>
          <Toaster
            closeButton={true}
            icons={{
              success: <CheckCircle2Icon />,
              info: <InfoIcon />,
              warning: <TriangleAlertIcon />,
              error: <CircleXIcon />,
              loading: <LoaderCircleIcon />
            }}
            richColors={true}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
