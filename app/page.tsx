import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";

const events = [
    { title: "Tech Talk GIKI", date: "May 12, 2025", location: "GIKI Auditorium" },
    { title: "AI Workshop", date: "May 15, 2025", location: "Islamabad" },
    { title: "Startup Grind", date: "May 20, 2025", location: "Lahore" },
];

export default function Home() {
    return (
        <>
            <Navbar />
            <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <EventCard
                        key={index}
                        title={event.title}
                        date={event.date}
                        location={event.location}
                    />
                ))}
            </main>
        </>
    );
}
