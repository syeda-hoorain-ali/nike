import { Result } from "shipengine/esm/get-rates-with-shipment-details/types/public-result";
export type { Result as TrackingResult } from "shipengine/esm/track-using-carrier-code-and-tracking-number/types/public"


export type Rates = Result['rateResponse']['rates']

export interface ShippingAddress {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    cityLocality: string;
    stateProvince: string;
    postalCode: string;
    countryCode: string;
    addressResidentialIndicator: "unknown" | "yes" | "no";
}

export interface ShippingProduct {
    description?: string;
    quantity?: number;
    harmonizedTariffCode?: string;
    countryOfOrigin?: string;
    value?: {
        currency: "usd" | "cad" | "aud" | "gbp" | "eur" | "nzd";
        amount: number;
    };
    weight: {
        value: number;
        unit: string;
    };
    // countryOfOrigin?: Country;
}
