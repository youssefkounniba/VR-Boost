import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "VR Boost Agency — Home Staging virtuel & Hub & Avatar",
  description:
    "Transformez un bien vide en expérience immersive : home staging virtuel, visite 3D et accompagnement à distance via Hub & Avatar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={lato.variable}>
      <body>{children}</body>
    </html>
  );
}
