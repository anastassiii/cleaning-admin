import { create } from "zustand";
import type { User } from "../types/user";
import { mockUsers } from "../utils/mockUsers";

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: (email, password) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) return false;

    const { password: _, ...userWithoutPassword } = foundUser;

    set({ user: userWithoutPassword });
    return true;
  },

  logout: () => set({ user: null }),
}));
