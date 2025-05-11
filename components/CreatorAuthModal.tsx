"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

// Temporary hardcoded verified list
const verifiedCreators = new Set(["verified@creator.com"]);

export default function CreatorAuthModal() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [creator, setCreator] = useState<string | null>(null);
    const [error, setError] = useState("");

    const toggleMode = () => {
        setIsRegister(!isRegister);
        setError("");
    };

    const validateEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setError("Enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        if (isRegister) {
            toast("Registered as Creator", {
                description: "Your account will be reviewed before approval.",
            });
        } else {
            if (!verifiedCreators.has(email)) {
                setError("You are not yet a verified creator.");
                return;
            }
            toast.success("Welcome back, Verified Creator!", {
                description: `Hello ${email}`,
            });
        }

        setCreator(email);
        setEmail("");
        setPassword("");
        setError("");
    };

    const handleLogout = () => {
        setCreator(null);
        toast("Logged Out", {
            description: "You have logged out from your creator account.",
        });
    };

    return creator ? (
        <div className="flex items-center gap-2">
            <Avatar>
                <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <span className="text-sm text-zinc-800">{creator}</span>
            <Button
                size="sm"
                variant="ghost"
                onClick={handleLogout}
                className="text-red-600"
            >
                Logout
            </Button>
        </div>
    ) : (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-purple-100 hover:bg-purple-200 text-purple-700">
                    Creator Login
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4 text-center">
                    {isRegister ? "Join as a Creator" : "Creator Login"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="creator@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <Button type="submit" className="w-full">
                        {isRegister ? "Register as Creator" : "Login as Creator"}
                    </Button>

                    <p className="text-sm text-center text-zinc-500">
                        {isRegister
                            ? "Already a creator?"
                            : "Want to become a creator?"}{" "}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="text-purple-600 hover:underline font-medium"
                        >
                            {isRegister ? "Login" : "Register"}
                        </button>
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}
