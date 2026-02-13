import type { UserRole } from "../store/authStore";
import type { OrderStatus, Order } from "../types/order";

export const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  CREATED: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["ASSIGNED", "CANCELLED"],
  ASSIGNED: ["IN_PROGRESS", "CANCELLED"],
  IN_PROGRESS: ["COMPLETED", "CANCELLED"],
  COMPLETED: [],
  CANCELLED: [],
};

export const canTransition = (
    current: OrderStatus,
    next: OrderStatus
): boolean => {
    return allowedTransitions[current].includes(next)
};

export const canUserChangeStatus = (
    role: UserRole,
    current: OrderStatus,
    next: OrderStatus
) : boolean => {
    if (!canTransition(current, next)) return false;

    switch (role) {
        case "CLIENT":
            return next === "CANCELLED";
        case "ADMIN":
            return ["CONFIRMED", "ASSIGNED", "CANCELLED"].includes(next);
        case "CLEANER":
            return ["IN_PROGRESS", "COMPLETED"].includes(next);
        default:
            return false;
    }
}