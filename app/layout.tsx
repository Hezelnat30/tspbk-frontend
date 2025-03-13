import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Onest } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/route";
import "./globals.css";
import Providers from "./providers";

const onest = Onest({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TS PBK",
  description: "Tracking Service for PBK",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={onest.className}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
