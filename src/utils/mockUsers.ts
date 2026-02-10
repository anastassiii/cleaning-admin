import type { User } from "../types/user";

export const mockUsers: (User & { password: string })[] = [
    {
    id: "1",
    email: "admin@test.com",
    password: "1234",
    role: "ADMIN",
    },
    {
        id: "2",
        email: "cleaner@test.com",
        password: "1234",
        role: "CLEANER",
    },
    {
        id: "3",
        email: "client@test.com",
        password: "1234",
        role: "CLIENT",
    },
]