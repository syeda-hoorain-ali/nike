import { CartEntry } from "use-shopping-cart/core";

export interface IProduct {
    id: string;
    name: string;
    image: string;
    category: { name: string };
    price: number;
    price_id: string;
    colors: string[];
    label: string;
    size: string[];
    stock: number;
}

export interface ICartProduct extends CartEntry {
    product_data?: {
        colors: string[];
        sizes: string[];
    }
}

export interface SearchParams {
    category?: string | null;
    query?: string | null;
    sort?: string | null;
    latest?: boolean | null;
    price?: string | null; // Format: '2000-40000'
}
