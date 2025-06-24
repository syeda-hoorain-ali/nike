import { exchangeRate } from "@/lib/data";
import { getRates } from "@/lib/ship-engine";
import { addressSchema } from "@/schema/addressSchema";
import { ShippingProduct } from "@/types/shipengine";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { CartEntry } from "use-shopping-cart/core";
import { z } from "zod";

export const POST = async (request: NextRequest) => {
    type FormType = z.infer<typeof addressSchema>
    type ResponseType = { address: FormType, products: CartEntry[] }

    try {
        const { address, products } = (await request.json()) as ResponseType;


        const shippingProducts: ShippingProduct[] = []

        for (const product of products) {

            try {
                const usdAmount = await exchangeRate('inr', 'usd', product.price)

                shippingProducts.push({
                    description: product.name,
                    quantity: product.quantity,
                    countryOfOrigin: address.country,
                    weight: {
                        value: Math.random() * 3, // TODO: later i will also add this field in sanity
                        unit: 'ounce'
                    },
                    value: {
                        amount: usdAmount || 0,
                        currency: 'usd'
                    }
                })
            } catch (error) {
                const err = error as AxiosError;
                console.error('Error getting amount:', error);
                return NextResponse.json({
                    success: false,
                    message: err.message
                }, { status: err.status });
            }
        }


        const rates = await getRates(
            {
                name: `${address.firstName} ${address.lastName}`,
                phone: address.phone,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                cityLocality: address.city,
                stateProvince: address.state,
                postalCode: address.postalCode,
                countryCode: address.country,
                addressResidentialIndicator: "yes",
            },
            shippingProducts
        )

        return NextResponse.json({
            success: true,
            message: "Successfully fetched rates",
            rates
        }, { status: 200 });

    } catch (error) {
        console.error('Error getting rates:', error);
        return NextResponse.json({
            success: false,
            error: (error as Error).message || "Error getting rates"
        }, { status: 500 });
    }
}
