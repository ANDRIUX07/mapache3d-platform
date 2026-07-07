import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mapache 3D GT",
  description: "Impresión 3D personalizada en Guatemala.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}