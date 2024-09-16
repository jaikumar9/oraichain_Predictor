export interface PriceData {
    id: number;
    name: string;
    price: number;
}

export const data: PriceData[];
export function randomPrice(currentPrice: number): number;
export function updateDataPrice(symbol: string, newPrice: number): void;
