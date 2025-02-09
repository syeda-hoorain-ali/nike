import { trackParcel } from "@/lib/ship-engine";
import { client } from "@/sanity/lib/client";
import { trackingQuery } from "@/sanity/lib/query";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {

    try {
        const { searchParams } = request.nextUrl
        const trackingNumber = searchParams.get('trackingNumber')

        if (!trackingNumber) {
            return NextResponse.json({
                success: false,
                message: "Invalid query parameter"
            }, { status: 400 });
        }

        const shipping = await client.fetch(trackingQuery, { trackingNumber })
        console.log('shipping', shipping)

        if (!shipping) {
            return NextResponse.json({
                success: false,
                message: "Invalid tracking number"
            }, { status: 400 });
        }

        console.log('shipping', shipping)
        const response = await trackParcel(shipping)

        if(typeof response == 'string') {
            return NextResponse.json({
                success: false,
                message: response
            }, { status: 403 });
        }

        return NextResponse.json({
            success: true,
            message: "Successfull",
            result: response
        }, { status: 200 });

    } catch (error) {
        console.error('Error getting rates:', error);
        return NextResponse.json({
            success: false,
            error: (error as Error).message || "Error getting rates"
        }, { status: 500 });
    }
}


