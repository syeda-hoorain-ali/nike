import { CountriesApiResponse, ExchangeRatesApiResponse, PaymentIntentApiResponse, RatesApiResponse, TrackingApiResponse } from "@/types/apiResponse";
import { ICountry, IPlace, RatesParams } from "@/types/data";
import axios, { AxiosError } from "axios";

export const getCountries = async (): Promise<ICountry[]> => {
    try {
        const { data } = await axios.get<CountriesApiResponse>('https://countriesnow.space/api/v0.1/countries/')
        const countries: ICountry[] = data.data.map(item => ({
            name: item.country,
            code: item.iso2
        }))
        return countries

    } catch (error) {
        console.log(error);
        return []
    }
}

export const getCities = async (country: string): Promise<string[]> => {
    try {
        const { data } = await axios.post('https://countriesnow.space/api/v0.1/countries/cities', { country: country })
        console.log("country", country)
        console.log("cities", data)
        return data.data

    } catch (error) {
        console.log(error);
        return []
    }
}

export const getAddress = async (query: string): Promise<IPlace[]> => {
    try {
        const { data } = await axios.get<IPlace[]>(
            `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${query}`
        );
        return data
    } catch (error) {
        console.error("Error fetching address suggestions:", error);
        return []
    }
};

export const getRates = async (params: RatesParams) => {
    try {
        const { data } = await axios.post<RatesApiResponse>('/api/rates', params)

        return data.rates || []
    } catch (error) {
        console.error("Error fetching address suggestions:", error);
        return []
    }
}

export const exchangeRate = async (from: string, to: string, amount: number): Promise<number | null> => {
    try {
        const { data } = await axios.get<ExchangeRatesApiResponse>(
            `/api/exchange-rate?from=${from}&to=${to}&amount=${amount}`
        )

        console.log("converted amount: ", data.convertedAmount)
        return data.convertedAmount || null

    } catch (error) {
        console.error("Error converting amount: ", error)
        return null
    }
}


export const getPaymentIntent = async (amount: number, currency: string): Promise<string> => {
    try {
        const { data } = await axios.post<PaymentIntentApiResponse>(
            "/api/payment-intent",
            { amount, currency }
        )

        console.log("client secrect: ", data)
        return data.clientSecret || ''

    } catch (error) {
        console.error("Error converting amount: ", error)
        return ''
    }
}

export const trackOrder = async (trackingNumber: string) => {
    try {
        const { data } = await axios.get<TrackingApiResponse>(`/api/track?trackingNumber=${trackingNumber}`)

        console.log("converted amount: ", data.result)
        return data.result || data.message

    } catch (error) {
        
        const err = error as AxiosError<TrackingApiResponse>
        console.error("Error tracking order: ", err.message)
        return err.response?.data.message || err.message
    }
}
