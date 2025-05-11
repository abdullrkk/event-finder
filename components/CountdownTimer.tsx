// components/CountdownTimer.tsx
"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer({ targetDate }) {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
        };

        if (difference > 0) {
            timeLeft = {
                days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
                hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
                minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
                seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex space-x-4 text-center">
            <div>
                <div className="text-4xl font-bold">{timeLeft.days}</div>
                <div className="text-sm">Days</div>
            </div>
            <div>
                <div className="text-4xl font-bold">{timeLeft.hours}</div>
                <div className="text-sm">Hours</div>
            </div>
            <div>
                <div className="text-4xl font-bold">{timeLeft.minutes}</div>
                <div className="text-sm">Minutes</div>
            </div>
            <div>
                <div className="text-4xl font-bold">{timeLeft.seconds}</div>
                <div className="text-sm">Seconds</div>
            </div>
        </div>
    );
}
