import { createPrice, createProduct, getProduct, stripe, updateProduct } from '@/lib/stripe';
import { client } from '@/sanity/lib/client';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { NextRequest, NextResponse } from 'next/server';

if (!process.env.SANITY_WEBHOOK_SECRET) {
    throw new Error('Envoirement variables are not set');
}
const secret = process.env.SANITY_WEBHOOK_SECRET


export const POST = async (request: NextRequest) => {
    const signature = request.headers.get(SIGNATURE_HEADER_NAME) || '';
    const body = await request.text();

    // Verify the webhook signature
    if (!(await isValidSignature(body, signature, secret))) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const payload = JSON.parse(body);
        const { id, name, price, category, image } = payload;

        const existingProduct = await getProduct(id);

        if (existingProduct) {
            await updateProduct(id, name, category.name, image)

            // Check if the price has changed
            const prices = await stripe.prices.list({ product: id, active: true });
            const currentPrice = prices.data[0]?.unit_amount;

            if (currentPrice !== price * 100) {
                const { id: price_id } = await createPrice(id, price)

                // Update the price_id in Sanity
                await client.patch(id).set({ price_id }).commit();

                return NextResponse.json({
                    success: true,
                    message: "Product updated, new price added to Stripe",
                }, { status: 200 });
            }

            return NextResponse.json({
                success: true,
                message: "Product updated",
            }, { status: 200 });
        }

        const product = await createProduct(id, name, category.name, image)
        const { id: price_id } = await createPrice(product.id, price)

        // Update the price_id in Sanity
        await client.patch(id).set({ price_id }).commit();

        return NextResponse.json({
            success: true,
            message: "Product added to Stripe"
        }, { status: 200 });

    } catch (error) {
        console.error('Error syncing product to Stripe:', error);
        return NextResponse.json({
            success: false,
            error: (error as Error).message
        }, { status: 500 });
    }
}

export const DELETE = async (request: NextRequest) => {

    const signature = request.headers.get(SIGNATURE_HEADER_NAME) || ''
    const body = await request.text()

    if (!(await isValidSignature(body, signature, secret))) {
        return NextResponse.json(
            { success: false, message: 'Unauthorized' },
            { status: 401 }
        );
    }

    try {
        const payload = await JSON.parse(body);
        const { id } = payload;

        const product = await getProduct(id);
        if (!product) {
            return NextResponse.json(
                { success: false, message: "Product not found" },
                { status: 404 }
            );
        }

        const prices = await stripe.prices.list({ product: id });

        // Delete all associated prices
        for (const price of prices.data) {
            await stripe.prices.update(price.id, { active: false });
        }
        await stripe.products.del(id)


        return NextResponse.json(
            { success: true, message: "Product deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error syncing product to Stripe:', error);

        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 500 }
        );
    }
}
