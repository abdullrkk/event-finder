'use client';

import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CartDrawer({
                                       isOpen,
                                       onClose,
                                   }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { items, removeFromCart, updateQuantity, getTotal } = useCart();

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleQuantityChange = (eventId: number, tier: string, quantity: number) => {
        updateQuantity(eventId, tier, quantity);
        toast.success('Cart updated');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Dialog open={isOpen} onClose={onClose} className="relative z-50">
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        onClick={onClose}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl p-6 overflow-y-auto"
                    >
                        <Dialog.Title className="text-xl font-bold mb-4">Your Cart</Dialog.Title>

                        {items.length === 0 ? (
                            <p className="text-gray-600">Your cart is empty.</p>
                        ) : (
                            <div className="space-y-6">
                                {items.map((item, i) => (
                                    <div key={`${item.eventId}-${item.tier}`} className="border-b pb-4">
                                        <div className="flex justify-between font-medium">
                      <span>
                        {item.title} ({item.tier})
                      </span>
                                            <button
                                                onClick={() => {
                                                    removeFromCart(item.eventId, item.tier);
                                                    toast('Removed from cart');
                                                }}
                                                className="text-red-500 text-sm"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center mt-2 text-sm text-gray-700">
                                            <span>Price: ${item.pricePerTicket}</span>
                                            <div className="flex items-center gap-2">
                                                <label htmlFor={`qty-${i}`}>Qty:</label>
                                                <input
                                                    id={`qty-${i}`}
                                                    type="number"
                                                    min={1}
                                                    max={10}
                                                    value={item.quantity}
                                                    onChange={(e) =>
                                                        handleQuantityChange(
                                                            item.eventId,
                                                            item.tier,
                                                            parseInt(e.target.value)
                                                        )
                                                    }
                                                    className="w-16 px-2 py-1 border rounded"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-right text-sm mt-1 font-semibold">
                                            Subtotal: ${item.pricePerTicket * item.quantity}
                                        </p>
                                    </div>
                                ))}

                                <div className="text-right font-bold text-lg mt-6">
                                    Total: ${getTotal()}
                                </div>

                                <Button size="lg" className="w-full mt-4">
                                    Proceed to Checkout
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
