// context/CartContext.tsx

"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
    eventId: number;
    title: string;
    tier: string;
    quantity: number;
    pricePerTicket: number;
};

type CartContextType = {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (eventId: number, tier: string) => void;
    clearCart: () => void;
    updateQuantity: (eventId: number, tier: string, quantity: number) => void;
    getTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setItems((prev) => {
            const existing = prev.find(
                (i) => i.eventId === item.eventId && i.tier === item.tier
            );
            if (existing) {
                return prev.map((i) =>
                    i.eventId === item.eventId && i.tier === item.tier
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (eventId: number, tier: string) => {
        setItems((prev) =>
            prev.filter((i) => !(i.eventId === eventId && i.tier === tier))
        );
    };

    const updateQuantity = (eventId: number, tier: string, quantity: number) => {
        setItems((prev) =>
            prev.map((i) =>
                i.eventId === eventId && i.tier === tier
                    ? { ...i, quantity }
                    : i
            )
        );
    };

    const clearCart = () => setItems([]);

    const getTotal = () =>
        items.reduce((total, item) => total + item.quantity * item.pricePerTicket, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                clearCart,
                updateQuantity,
                getTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
}
