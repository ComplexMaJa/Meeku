import { useState, useCallback, useEffect, type ReactNode } from 'react';
import { CartContext, type CartItem } from './useCart';

const CART_STORAGE_KEY = 'meeku_cart_items';

const getInitialCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(getInitialCart);

    // Persist cart to localStorage on changes
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch {
            // Ignore localStorage errors (quota or private mode)
        }
    }, [items]);

    const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
        setItems((prev) => {
            const existing = prev.find(
                (item) => item.id === newItem.id && item.size === newItem.size
            );
            if (existing) {
                return prev.map((item) =>
                    item.id === newItem.id && item.size === newItem.size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
    }, []);

    const removeItem = useCallback((id: number, size: string) => {
        setItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
    }, []);

    const updateQuantity = useCallback((id: number, size: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id, size);
            return;
        }
        setItems((prev) =>
            prev.map((item) =>
                item.id === id && item.size === size ? { ...item, quantity } : item
            )
        );
    }, [removeItem]);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = items.reduce((sum, item) => {
        const unitPrice = typeof item.priceNum === 'number'
            ? item.priceNum
            : parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return sum + unitPrice * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};
