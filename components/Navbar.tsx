"use client";

import { useEffect, useState } from "react";
import AuthModal from "./AuthModal";
import CreatorAuthModal from "./CreatorAuthModal";
import CartDrawer from "./CartDrawer";
import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";

export default function Navbar() {
    const [cartOpen, setCartOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const { items } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["features", "testimonials", "events", "subscribe"];
            const scrollPosition = window.scrollY + 100;
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-zinc-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-tight text-blue-600"> Event Finder</div>

                {/* Section Links */}
                <div className="hidden md:flex space-x-6 text-sm font-medium text-zinc-700">
                    {["features", "testimonials", "events", "subscribe"].map((section) => (
                        <button
                            key={section}
                            onClick={() => scrollTo(section)}
                            className={`transition-colors duration-200 hover:text-blue-600 ${
                                activeSection === section ? "text-blue-600 font-semibold" : ""
                            }`}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Right-side: Auth + Cart */}
                <div className="flex items-center gap-3">
                    {/* Auth Modals */}
                    <AuthModal />
                    <CreatorAuthModal />

                    {/* Cart icon */}
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setCartOpen(true)}
                            className="hover:bg-blue-100 hover:text-blue-600 transition rounded-full"
                        >
                            🛒
                            {items.length > 0 && (
                                <span className="absolute -top-2 -right-2 text-xs bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow">
                  {items.length}
                </span>
                            )}
                        </Button>
                    </div>

                    {/* Cart Drawer */}
                    <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
                </div>
            </div>
        </nav>
    );
}
