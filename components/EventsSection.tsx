'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Dialog } from '@headlessui/react';
import { useCart } from "@/context/CartContext";

const categories = ['All', 'Party', 'Fashion', 'Education'];
const tiers = ['All', 'Standard', 'VIP', 'VVIP'];

type Price = { label: string; amount: number };
type EventType = {
    id: number;
    title: string;
    description: string;
    image: string;
    prices: Price[];
    category: string;
    date: string;
    time: string;
};

const eventDetails = [
    {
        title: "Blackpink 2025 World Tour: Born Pink",
        image: "/images/event-1.jpg",
        description: "Get ready for the ultimate K-pop experience at the Blackpink 2025 World Tour concert, where the globally renowned girl group brings their high-energy performances to the stage. Blackpink will perform their greatest hits including \"Ddu-Du Ddu-Du,\" \"Kill This Love,\" and \"How You Like That\" along with new tracks from their latest album Born Pink. With state-of-the-art visuals, mind-blowing choreography, and their signature bold fashion, this concert is a celebration of everything Blackpink has achieved. Don’t miss this electrifying show as Jennie, Jisoo, Lisa, and Rosé light up the stage in a performance of a lifetime!",
        date: "Saturday, 2025-06-15",
        time: "10:00 PM",
    },
    {
        title: "MetGala Rave: Cosmic Beats Under the Stars",
        image: "/images/event-2.jpg",
        description: "After the glitz and glam of the MetGala 2025, join us for the MetGala Rave, an electrifying after-party that continues the cosmic theme with pulsating music, neon lights, and immersive experiences. Set against a backdrop of stunning visual art and laser shows, this rave will feature top DJs spinning futuristic beats that will keep you dancing all night long. It's the perfect fusion of fashion and music, where the world of high society meets the underground rave scene in a truly cosmic celebration.",
        date: "Monday, 2025-07-05",
        time: "2:00 AM",
    },
    {
        title: "The Future of Artificial Intelligence",
        image: "/images/event-3.jpg",
        description: "Join us for an inspiring TED Talk where experts in AI and machine learning discuss the future of technology, the ethical implications of AI, and how it will transform industries like healthcare, education, and more. This session will feature insights from leading researchers and innovators in the field.",
        date: "Wednesday, 2025-06-25",
        time: "4:00 PM",
    },
    {
        title: "Ultimate Dance Session: Hip-Hop Fusion",
        image: "/images/event-4.jpg",
        description: "Calling all dancers and dance enthusiasts! The Ultimate Dance Session is a high-energy event designed to get you moving and grooving. Join professional dancers for a fun, interactive workshop where you'll learn the latest hip-hop and urban dance styles, including fusion moves from various genres. Whether you’re a beginner or seasoned pro, this session will challenge you to push your limits and have fun. Perfect for anyone wanting to explore the world of dance or improve their skills. The event will also feature an exclusive performance by the instructors to showcase their moves.",
        date: "Sunday, 2025-07-01",
        time: "6:00 PM",
    },
    {
        title: "MetGala 2025: A Night of Glamour & Elegance",
        image: "/images/event-5.jpg",
        description: "Step into a world of luxury and opulence at the MetGala 2025, where fashion, art, and culture collide in the most extravagant celebration of the year. Hosted at the iconic Metropolitan Museum of Art, this exclusive red-carpet event invites you to witness the world's top designers, celebrities, and influencers showcasing their most awe-inspiring looks. The theme this year is \"Cosmic Couture,\" exploring the boundaries between fashion and the universe. Enjoy live performances, exquisite gourmet dining, and an unforgettable evening of glamour.",
        date: "Monday, 2025-07-05",
        time: "7:00 PM",
    },
    {
        title: "Watercolor Wonders: An Evening of Creativity",
        image: "/images/event-6.jpg",
        description: "Unleash your inner artist at this relaxing watercolor painting session. Guided by a professional artist, you'll learn techniques to create beautiful landscapes and abstract art. Perfect for beginners and seasoned painters alike, the event encourages creative expression and a calm, fun atmosphere.",
        date: "Sunday, 2025-07-10",
        time: "9:00 AM",
    },
    {
        title: "Stand-Up Comedy: The Hilarious World of Ali Wong",
        image: "/images/event-7.jpg",
        description: "Get ready for an unforgettable night of laughter with Ali Wong, one of the most hilarious and bold stand-up comedians today! Known for her unapologetic humor and razor-sharp wit, Ali Wong brings her unique perspective to the stage, tackling everything from relationships and motherhood to her own personal experiences. With her signature style, she will have you rolling with laughter in no time. This event is a must-attend for comedy lovers looking for a good time and plenty of laughs.",
        date: "Friday, 2025-07-15",
        time: "8:00 PM",
    },
];

const generateEvents = (): EventType[] =>
    eventDetails.map((detail, i) => ({
        id: i,
        title: detail.title,
        description: detail.description,
        image: detail.image,
        prices: [
            { label: 'Standard', amount: 10 + i * 2 },
            { label: 'VIP', amount: 30 + i * 3 },
            { label: 'VVIP', amount: 60 + i * 4 },
        ],
        category: categories[(i % (categories.length - 1)) + 1], // Skip "All"
        date: detail.date,
        time: detail.time,
    }));

const allEvents = generateEvents();

export default function EventsSection() {
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
    const [filters, setFilters] = useState({ category: 'All', tier: 'All' });

    const filteredEvents = allEvents.filter((event) => {
        const categoryMatch = filters.category === 'All' || event.category === filters.category;
        const tierMatch =
            filters.tier === 'All' || event.prices.some((p) => p.label === filters.tier);
        return categoryMatch && tierMatch;
    });

    return (
        <section id="events" className="bg-white py-20 px-6">
            <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>

            <FilterBar filters={filters} setFilters={setFilters} />

            <div className="flex flex-col gap-10 mt-10 max-w-3xl mx-auto">
                {filteredEvents.map((event) => (
                    <EventCard key={event.id} event={event} onClick={() => setSelectedEvent(event)} />
                ))}
            </div>

            <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        </section>
    );
}

function FilterBar({
                       filters,
                       setFilters,
                   }: {
    filters: { category: string; tier: string };
    setFilters: React.Dispatch<React.SetStateAction<{ category: string; tier: string }>>;
}) {
    return (
        <div className="flex flex-wrap justify-center gap-6 mb-8">
            <Dropdown
                label="Category"
                options={categories}
                value={filters.category}
                onChange={(value) => setFilters((f) => ({ ...f, category: value }))}
            />
            <Dropdown
                label="Tier"
                options={tiers}
                value={filters.tier}
                onChange={(value) => setFilters((f) => ({ ...f, tier: value }))}
            />
        </div>
    );
}

function Dropdown({
                      label,
                      options,
                      value,
                      onChange,
                  }: {
    label: string;
    options: string[];
    value: string;
    onChange: (val: string) => void;
}) {
    return (
        <div className="flex flex-col items-start">
            <label className="text-sm font-semibold mb-1">{label}</label>
            <select
                className="border px-3 py-2 rounded text-sm"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

function EventCard({ event, onClick }: { event: EventType; onClick: () => void }) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="group overflow-hidden rounded-lg shadow-lg bg-zinc-100 cursor-pointer transition-all duration-300"
            onClick={onClick}
        >
            <Image
                src={event.image}
                alt={event.title}
                width={800}
                height={400}
                className="w-full h-56 object-cover"
            />
            <div className="p-4">
                <h4 className="text-xl font-bold">{event.title}</h4>
                <p className="text-gray-600 mt-1">{event.description}</p>
                <div className="mt-3 space-y-1 text-sm text-gray-800">
                    {event.prices.map((p) => (
                        <p key={p.label}>
                            {p.label}: <span className="font-semibold">${p.amount}</span>
                        </p>
                    ))}
                    <p className="mt-2 text-gray-700">
                        Date: {event.date} | Time: {event.time}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

function EventModal({
                        event,
                        onClose,
                    }: {
    event: EventType | null;
    onClose: () => void;
}) {
    const [form, setForm] = useState({
        name: '',
        email: '',
        quantity: 1,
        tier: 'Standard',
    });

    const { addToCart } = useCart(); // ✅ use cart

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'quantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedTier = event?.prices.find((p) => p.label === form.tier);
        if (!selectedTier || !event) return;

        addToCart({
            eventId: event.id,
            title: event.title,
            tier: form.tier,
            quantity: form.quantity,
            pricePerTicket: selectedTier.amount,
        });

        onClose();
    };

    if (!event) return null;

    return (
        <Dialog open={!!event} onClose={onClose} className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white p-6 rounded-lg max-w-lg w-full relative shadow">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
                    >
                        ✕
                    </button>
                    <Dialog.Title className="text-2xl font-bold mb-4">{event.title}</Dialog.Title>
                    <Dialog.Description className="text-gray-700 mb-4">
                        {event.description}
                    </Dialog.Description>
                    <p className="text-gray-700">Date: {event.date} | Time: {event.time}</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 text-sm"
                            />
                        </div>

                        <div className="flex justify-between gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Ticket Type</label>
                                <select
                                    name="tier"
                                    value={form.tier}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2 text-sm"
                                >
                                    {event.prices.map((price) => (
                                        <option key={price.label} value={price.label}>
                                            {price.label} - ${price.amount}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Quantity</label>
                                <input
                                    type="number"
                                    name="quantity"
                                    min={1}
                                    max={10}
                                    value={form.quantity}
                                    onChange={handleChange}
                                    className="w-full border rounded px-3 py-2 text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                        >
                            Add to Cart
                        </button>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}

export { EventModal };
