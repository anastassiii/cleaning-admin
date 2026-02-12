import type { CleaningType, ExtraOption } from "../types/order";

const basePriceByType: Record<CleaningType, number> = {
    STANDARD: 50,
    DEEP: 80,
    AFTER_RENOVATION: 120,
}

const roomPrice = 20;
const bathroomPrice = 15;
const additionalHourPrice = 20;

const extraPrices: Record<ExtraOption, number> = {
    OVEN: 15,
    HOOD: 10,
    KITCHEN_CABINETS: 20,
    DISHES: 10,
    FRIDGE: 15,
    MICROWAVE: 5,
    BALCONY: 20,
    WINDOWS: 25,
    IRONING: 20,
    WARDROBE: 25,
}

export const calculateOrderPrice = (
    type: CleaningType,
    rooms: number,
    bathrooms: number,
    extras: ExtraOption[],
    additionalHours: number,
    promoCode?: string
) => {
    const base = basePriceByType[type];

    const roomsTotal = rooms * roomPrice;
    const bathroomsTotal = bathrooms * bathroomPrice;

    const extrasTotal = extras.reduce((sum, extra) => {
        return sum + extraPrices[extra];
    }, 0);

    const hoursTotal = additionalHours * additionalHourPrice;
    const promoMap: Record<string, number> = {
        SALE10: 0.1,
        SALE20: 0.2,
    }

    let total = 
        base +
        roomsTotal +
        bathroomsTotal + 
        extrasTotal + 
        hoursTotal;
    if (promoCode && promoMap[promoCode]) {
        total = total * (1 - promoMap[promoCode]);
    }

    return Math.round(total)
}

export const calculateDuration = (
    rooms: number,
    bathrooms: number,
    additionalHours: number
) => {
    const baseTime = rooms * 1.5 + bathrooms * 1;
        return Math.round(baseTime + additionalHours);
    }