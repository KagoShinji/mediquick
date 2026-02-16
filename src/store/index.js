import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product, quantity = 1) => {
                const items = get().items;
                const existingItem = items.find(item => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + quantity }
                                : item
                        ),
                    });
                } else {
                    set({ items: [...items, { ...product, quantity }] });
                }
            },

            removeFromCart: (productId) => {
                set({ items: get().items.filter(item => item.id !== productId) });
            },

            updateQuantity: (productId, quantity) => {
                if (quantity <= 0) {
                    get().removeFromCart(productId);
                } else {
                    set({
                        items: get().items.map(item =>
                            item.id === productId ? { ...item, quantity } : item
                        ),
                    });
                }
            },

            clearCart: () => set({ items: [] }),

            getTotal: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },

            getItemCount: () => {
                return get().items.reduce((count, item) => count + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    login: (userData) => {
        set({ user: userData, isAuthenticated: true });
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
    },

    register: (userData) => {
        set({ user: userData, isAuthenticated: true });
    },
}));

export const useOrderStore = create((set, get) => ({
    orders: [],
    currentOrder: null,

    createOrder: (orderData) => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            date: new Date().toISOString(),
            status: 'Processing',
            ...orderData,
        };

        set({
            orders: [newOrder, ...get().orders],
            currentOrder: newOrder,
        });

        return newOrder;
    },

    updateOrderStatus: (orderId, status) => {
        set({
            orders: get().orders.map(order =>
                order.id === orderId ? { ...order, status } : order
            ),
        });
    },
}));
