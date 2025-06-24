import { CartEntry } from "use-shopping-cart/core";
import { addressSchema } from "@/schema/addressSchema";
import { z } from "zod";


export interface IProduct {
    id: string;
    name: string;
    image: string;
    description: string;
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
        product_id: string;
    }
}

export interface SearchParams {
    category?: string | null;
    query?: string | null;
    sort?: string | null;
    latest?: boolean | null;
    price?: string | null; // Format: '2000-40000'
}

export interface IPlace {
    display_name: string;
    address: {
        village?: string;
        town?: string;
        city?: string;
        state: string;
        "ISO3166-2-lvl4": string;
        postcode: string;
        country: string;
        country_code: string;
    }
}

export interface RatesParams {
    address: z.infer<typeof addressSchema>,
    products: {
        name: string;
        quantity: number;
        price: number;
    }[]
}

export interface ICountry {
    name: string,
    code: string
}
