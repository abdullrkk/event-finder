// components/SubscribeForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SubscribeForm() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!isValid) {
            toast.error("Invalid Email", {
                description: "Please enter a valid email address.",
            });
            return;
        }
        toast.success("Subscribed!", {
            description: "You’ll now receive event updates in your inbox.",
        });
        setEmail("");
    };

    return (
        <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3 justify-center">
            <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button type="submit">Subscribe</Button>
        </form>
    );
}
