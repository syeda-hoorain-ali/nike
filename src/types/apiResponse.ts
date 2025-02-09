import { Rates, TrackingResult } from "./shipengine";

interface ApiResponse {
    success: boolean;
    message: string;
}

export interface RatesApiResponse extends ApiResponse {
    rates: Rates
}

export interface ExchangeRatesApiResponse extends ApiResponse {
    convertedAmount?: number | undefined
}

export interface PaymentIntentApiResponse extends ApiResponse {
    clientSecret?: string | null
}

export interface CheckoutApiResponse extends ApiResponse {
    label?: string | undefined
}

export interface TrackingApiResponse extends ApiResponse {
    result?: TrackingResult
}

export interface CountriesApiResponse {
    error: boolean;
    msg: string;
    data: {
        iso2: string
        iso3: string;
        country: string;
        cities: string[];
    }[]
}