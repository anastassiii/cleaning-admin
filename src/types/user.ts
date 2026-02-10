export type UserRole = "CLIENT" | "CLEANER" | "ADMIN";

export interface User {
    id: string;
    email: string;
    role: UserRole;
}