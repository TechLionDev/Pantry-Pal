import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pantry Pal - Auth",
  description:
    "Pantry Pal is a recipe search engine that helps you find recipes based on the ingredients you have in your pantry."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
