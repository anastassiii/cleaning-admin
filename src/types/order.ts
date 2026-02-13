export type CleaningType = "STANDARD" | "DEEP" | "AFTER_RENOVATION";

export type OrderStatus = 
    | "CREATED"
    | "CONFIRMED"
    | "ASSIGNED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELLED";

export type ExtraOption =
  | "OVEN"
  | "HOOD"
  | "KITCHEN_CABINETS"
  | "DISHES"
  | "FRIDGE"
  | "MICROWAVE"
  | "BALCONY"
  | "WINDOWS"
  | "IRONING"
  | "WARDROBE";

export type PaymentMethod = "CARD" | "CASH";

export interface Order {
  id: number;
  clientId: number;
  type: CleaningType;
  rooms: number;
  bathrooms: number;
  extras: ExtraOption[];
  additionalHours: number;
  date: string;
  time: string;
  address: string;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  price: number;
  status: OrderStatus;
}
export interface NewOrderForm {
  type: CleaningType;
  rooms: number;
  bathrooms: number;
  extras: ExtraOption[];
  additionalHours: number;
  date: string;
  time: string;
  address: string;
  paymentMethod: PaymentMethod;
  promoCode: string;
}

export const initialState: NewOrderForm = {
  type: "STANDARD",
  rooms: 1,
  bathrooms: 1,
  extras: [],
  additionalHours: 0,
  date: "",
  time: "",
  address: "",
  paymentMethod: "CARD",
  promoCode: "",
};