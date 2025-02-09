import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    try {

        const { amount, currency } = await request.json();
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.floor(amount * 100), // convert in smallest value 
            currency
        });

        console.log("payment intent: ", paymentIntent)

        return NextResponse.json({
            success: true,
            message: 'Payment intent created',
            clientSecret: paymentIntent.client_secret
        })

    } catch (error) {
        
        console.log("Error creating payment intent: ", error)

        return NextResponse.json({
            success: false,
            message: (error as Error).message || "Error creating payment intent",
        })
    }
}
