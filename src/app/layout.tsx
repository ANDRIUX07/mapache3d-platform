import type { Metadata } from "next";
import "./globals.css";

import { CartProvider } from "@/features/cart/context/CartContext";
import { CartDrawer } from "@/features/cart/components/CartDrawer";

export const metadata: Metadata = {
  title: "Mapache 3D GT",
  description: "Traemos a la realidad tus ideas con impresión 3D.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
          <CartDrawer />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}