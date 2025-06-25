import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (request: NextRequest) => {
    try {

        const { searchParams } = request.nextUrl;
        const from = searchParams.get("from");
        const to = searchParams.get("to");
        const amount = Number(searchParams.get("amount"));

        if (!from || !to || isNaN(amount)) {
            return NextResponse.json({
                success: false,
                message: "Invalid query parameters"
            }, { status: 400 });
        }

        try {
            const URL = `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/pair/${from}/${to}/${amount}`
            const response = await axios.get(URL)

            return NextResponse.json({
                success: true,
                message: "Successfull",
                convertedAmount: response.data.conversion_result
            }, { status: 200 })

        } catch (error) {
            const err = error as AxiosError
            console.error(err)

            return NextResponse.json({
                success: false,
                message: err.message,
            }, { status: err.status })
        }

    } catch (error) {
        return NextResponse.json({
            success: false,
            error: (error as Error).message || "Failed to fetch exchange rate"
        }, { status: 500 });
    }
}
