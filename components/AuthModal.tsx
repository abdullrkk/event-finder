// components/AuthModal.tsx
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

export default function AuthModal() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState<string | null>(null);
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
            setError("Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setUser(email);
        toast.success(isRegister ? "Registered Successfully" : "Login Successful", {
            description: `Welcome ${email}!`,
        });

        setEmail("");
        setPassword("");
        setError("");
    };

    const handleLogout = () => {
        setUser(null);
        toast("Logged Out", {
            description: "You have successfully logged out.",
        });
    };

    return user ? (
        <div className="flex items-center gap-2">
            <Avatar>
                <AvatarFallback>{user.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-zinc-800">{user}</span>
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
                <Button variant="outline">Login / Register</Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4 text-center">
                    {isRegister ? "Create an Account" : "Login to Your Account"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
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
                        {isRegister ? "Register" : "Login"}
                    </Button>

                    <p className="text-sm text-center text-zinc-500">
                        {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                        <button
                            type="button"
                            onClick={toggleMode}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            {isRegister ? "Login" : "Register"}
                        </button>
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
}
