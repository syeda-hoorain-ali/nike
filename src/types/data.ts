import { CartEntry } from "use-shopping-cart/core";

export interface IProduct {
    id: number;
    name: string;
    image: string;
    category: { name: string };
    price: number;
    price_id: string;
    colors: string[];
    label: string;
    size: string[];
}

export interface ICartProduct extends CartEntry {
    product_data?: {
        colors: string[];
        sizes: string[];
    }
}
