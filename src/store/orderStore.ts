import { create } from "zustand";
import type { Order } from "../types/order";

interface OrderState {
    orders: Order[];
    addOrder: (order:Order) => void;
    updateOrder: (id: string, updateData: Partial<Order>) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
    orders: [],

    addOrder: (order) => 
        set((state) => ({
            orders: [...state.orders, order]
        })),

    updateOrder: (id, updatedData) => 
        set((state) => ({
            orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updatedData } : order
        )
    }))
}));