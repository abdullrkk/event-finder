// app/layout.tsx

import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Event Finder",
    description: "Discover and submit local events",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <CartProvider>
            {children}
            <Toaster richColors position="top-right" />
        </CartProvider>
        </body>
        </html>
    );
}
