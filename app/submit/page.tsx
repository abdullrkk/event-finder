"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function SubmitEventPage() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Submitted:", { title, date, location, description });
        // You can send this data to your backend here
    }

    return (
        <>
            <Navbar />
            <main className="p-6 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Submit a New Event</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Event Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <Input
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <Textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button type="submit">Submit Event</Button>
                </form>
            </main>
        </>
    );
}
