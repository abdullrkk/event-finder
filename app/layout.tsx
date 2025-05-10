// ✅ This is a server component
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientProviders from "@/components/ClientProviders"; // <-- new wrapper

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Event Finder",
    description: "Discover and submit local events",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ClientProviders>{children}</ClientProviders>
        </body>
        </html>
    );
}
