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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = "VR Boost Agency — Virtual Home Staging & Hub & Avatar";
const description =
  "Turn an empty property into an immersive experience: virtual home staging, 3D tours and remote guidance via Hub & Avatar.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "VR Boost Agency",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "VR Boost Agency",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
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
