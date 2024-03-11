import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/assets/styles/app.css";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo List",
  description: "Todo list app build for defininng tasks and manage them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
