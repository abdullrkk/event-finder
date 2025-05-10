import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { EventProvider } from "@/lib/EventContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Event Finder",
    description: "Discover and share local events",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <EventProvider>{children}</EventProvider>
        </body>
        </html>
    );
}
