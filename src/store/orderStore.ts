// store/orderStore.ts
import { create } from "zustand";
import type { OrderStatus, Order } from "../types/order";
import type { UserRole } from "../store/authStore";
import { canUserChangeStatus } from "../utils/orderStateMachine";

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: number, nextStatus: OrderStatus, role: UserRole) => boolean;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),

  updateOrderStatus: (id, nextStatus, role) => {
    const order = get().orders.find((o) => o.id === id);
    if (!order) return false;

    if (!canUserChangeStatus(role, order.status, nextStatus)) {
      console.warn(`Role ${role} cannot change status from ${order.status} → ${nextStatus}`);
      return false;
    }

    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status: nextStatus } : o
      ),
    }));
    return true;
  },
}));
