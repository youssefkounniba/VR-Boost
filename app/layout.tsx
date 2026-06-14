import type { Metadata } from "next";
import { Lato, Roboto } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "VR Boost Agency — Virtual Home Staging & Hub & Avatar",
  description:
    "Turn an empty property into an immersive experience: virtual home staging, 3D tours and remote guidance via Hub & Avatar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${lato.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
