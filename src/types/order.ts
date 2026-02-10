export type CleaningType = "STANDART" | "DEEP" | "AFTER_RENOVATION";

export type OrderStatus = 
    | "CREATED"
    | "CONFIRMED"
    | "ASSIGNED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";

export interface Order {
    id: string;
    clientId: string;
    cleanerId?: string;
    type: CleaningType;
    area: number;
    extras: string[];
    price: number;
    estimateDuration: number;
    status: OrderStatus;
    createdAt: string;
}