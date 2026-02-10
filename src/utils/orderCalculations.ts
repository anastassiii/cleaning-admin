import type { CleaningType } from "../types/order";

const baseRates: Record<CleaningType, number> ={
    STANDART: 5,
    DEEP: 8,
    AFTER_RENOVATION: 12,
}

const extraPrices: Record<string, number> = {
    WINDOWS: 50,
    FURNITURE: 70,
    BALCONY: 40,
}

export const calculatePrice = (
    type: CleaningType,
    area: number,
    extras: string[]
) => {
    const base = baseRates[type] * area;

    const extrasTotal = extras.reduce((sum, extra) => {
        return sum + (extraPrices[extra] || 0);
    }, 0);

    return base + extrasTotal;
}

export const calculateDuration = (
    type: CleaningType,
    area: number
) => {
    const baseTimePerM2: Record<CleaningType, number> ={
        STANDART: 0.05,
        DEEP: 0.08,
        AFTER_RENOVATION: 0.12,
    }

    return Math.round(area * baseTimePerM2[type]);
}