/*
  Full modern landing page built with:
  - Next.js + TypeScript
  - Tailwind CSS
  - Framer Motion for animations
  - Lottie for animation
  - React Scroll Parallax
  - Swiper for carousel
  - Scroll-to-section navigation
*/

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Parallax } from "react-scroll-parallax";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import animationData from "@/public/animation.json";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function LandingPage() {
    const targetDate = new Date("2025-06-01T00:00:00");
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<null | { title: string; description: string }>(null);

    function getTimeLeft() {
        const now = new Date();
        const diff = targetDate.getTime() - now.getTime();
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const events = Array.from({ length: 20 }, (_, i) => ({
        title: `Event ${i + 1}`,
        description: `This is the description for event ${i + 1}. Details and agenda for this event go here.`,
    }));

    return (
        <>
            <Navbar />

            {/* Background video section */}
            <div className="relative h-screen w-full overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
                >
                    <source src="/background.mp4" type="video/mp4" />
                </video>

                <main className="flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <motion.h1
                        className="text-5xl font-bold"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        Event Convocation Starts In
                    </motion.h1>

                    <motion.div
                        className="flex gap-4 text-xl font-semibold my-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <TimeBlock label="Days" value={timeLeft.days} />
                        <TimeBlock label="Hours" value={timeLeft.hours} />
                        <TimeBlock label="Minutes" value={timeLeft.minutes} />
                        <TimeBlock label="Seconds" value={timeLeft.seconds} />
                    </motion.div>

                    <motion.div
                        className="flex gap-4"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 1 }}
                    >
                        <Button size="lg" onClick={() => scrollTo("features")}>Explore Features</Button>
                        <Button size="lg" variant="outline" onClick={() => scrollTo("testimonials")}>What People Say</Button>
                    </motion.div>
                </main>
            </div>

            {/* Lottie animation section */}
            <section className="bg-white py-20 text-center">
                <div className="max-w-xl mx-auto">
                    <Lottie animationData={animationData} loop={true} />
                </div>
            </section>

            {/* Parallax feature grid */}
            <section id="features" className="bg-zinc-100 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto px-6"
                >
                    <h2 className="text-3xl font-bold mb-10 text-center">Why Choose EventFinder?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {["AI-Powered Recommendations", "Crowdsourced Events", "Real-Time Updates"].map((feature, i) => (
                            <Parallax key={i} speed={10 * (i + 1)}>
                                <motion.div
                                    className="bg-white p-6 rounded-lg shadow"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * i, duration: 0.6 }}
                                >
                                    <h3 className="font-semibold text-lg">{feature}</h3>
                                    <p className="text-sm text-gray-500 mt-2">

                                    </p>
                                </motion.div>
                            </Parallax>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Event listing with modal */}
            <section id="events" className="bg-white py-20 px-6">
                <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {events.map((event, i) => (
                        <motion.div
                            key={i}
                            className="bg-zinc-100 p-6 rounded-lg shadow cursor-pointer hover:bg-zinc-200"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => {
                                setSelectedEvent(event);
                                setShowModal(true);
                            }}
                        >
                            <h4 className="font-semibold text-lg">{event.title}</h4>
                            <p className="text-sm text-gray-600 mt-2">Click for details</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Booking section */}
            <section className="bg-blue-50 py-20 text-center px-6">
                <h2 className="text-3xl font-bold mb-6">Book Your Tickets</h2>
                <p className="mb-6 max-w-xl mx-auto text-gray-700">Secure your spot now and be a part of the most exciting events around!</p>
                <Button size="lg">Book Now</Button>
            </section>

            {/* Testimonials Carousel */}
            <section id="testimonials" className="bg-white py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl font-bold text-center mb-10">What Our Users Say</h2>
                    <Swiper spaceBetween={50} slidesPerView={1} loop autoplay>
                        {[1, 2, 3].map((num) => (
                            <SwiperSlide key={num}>
                                <div className="max-w-2xl mx-auto text-center px-6">
                                    <p className="text-lg text-indigo-600 italic">
                                        "EventFinder changed the way I discover events in my city! Highly recommend it."
                                    </p>
                                    <h4 className="mt-4 font-semibold text-zinc-800">Hania Amir</h4>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </section>

            {/* Modal for event details */}
            {showModal && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow max-w-lg w-full relative">
                        <button className="absolute top-2 right-2 text-gray-600" onClick={() => setShowModal(false)}>
                            ✕
                        </button>
                        <h3 className="text-2xl font-bold mb-4">{selectedEvent.title}</h3>
                        <p className="text-gray-700">{selectedEvent.description}</p>
                    </div>
                </div>
            )}
        </>
    );
}

function TimeBlock({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-white/80 text-blue-800 px-4 py-2 rounded font-bold">
                {value.toString().padStart(2, "0")}
            </div>
            <span className="text-sm mt-1">{label}</span>
        </div>
    );
}
