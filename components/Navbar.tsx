"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-50">
            <Link href="/" className="text-2xl font-bold text-zinc-800">
                EventFinder
            </Link>
            <div className="space-x-4">
                <Button variant="ghost" asChild>
                    <Link href="/">Home</Link>
                </Button>
                <Button variant="ghost" asChild>
                    <Link href="/submit">Submit Event</Link>
                </Button>
            </div>
        </nav>
    );
}
