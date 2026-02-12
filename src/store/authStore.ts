import { create } from "zustand";

export type UserRole = "CLIENT" | "ADMIN" | "CLEANER";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
  login: (user: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Инициализация user из localStorage синхронно
  user: (() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.role) {
          return { ...parsed, role: parsed.role.toUpperCase() };
        }
      } catch {
        localStorage.removeItem("user");
      }
    }
    return null;
  })(),

  login: (user) => {
    if (!user || !user.role) return;

    const normalizedUser: User = {
      id: user.id!,
      name: user.name || "",
      email: user.email || "",
      role: user.role.toUpperCase() as UserRole,
    };

    localStorage.setItem("user", JSON.stringify(normalizedUser));
    set({ user: normalizedUser });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));