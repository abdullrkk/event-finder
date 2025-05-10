"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Event = {
    title: string;
    date: string;
    location: string;
    description: string;
};

type EventContextType = {
    events: Event[];
    addEvent: (event: Event) => void;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export function useEventContext() {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error("useEventContext must be used within EventProvider");
    }
    return context;
}

export function EventProvider({ children }: { children: ReactNode }) {
    const [events, setEvents] = useState<Event[]>([]);

    const addEvent = (event: Event) => {
        setEvents((prev) => [event, ...prev]);
    };

    return (
        <EventContext.Provider value={{ events, addEvent }}>
            {children}
        </EventContext.Provider>
    );
}
