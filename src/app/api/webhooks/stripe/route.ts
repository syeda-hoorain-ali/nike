import { sendReceipt } from '@/lib/email';
import { createLabel, getRates, ShippingAddress, trackParcel } from '@/lib/ship-engine';
import { client } from '@/sanity/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error('Environment variables are not set');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2024-12-18.acacia" });
const secret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST = async (request: NextRequest) => {
    const signature = request.headers.get('stripe-signature') || '';

    try {
        const rawBody = await request.text();

        // Verify and construct the Stripe event
        const event = stripe.webhooks.constructEvent(rawBody, signature, secret);

        // Process only "checkout.session.completed" events
        if (event.type !== "checkout.session.completed") {
            return NextResponse.json({
                success: false,
                message: `Unhandled event type: ${event.type}`
            }, { status: 401 });
        }

        // Extract relevant details from the event
        const session = event.data.object;
        const { id, customer_details, amount_total, status } = session;

        // Retrieve line items for the session
        const lineItems = await stripe.checkout.sessions.listLineItems(id);

        const products = [];

        // Update product stock and prepare product details
        for (const product of lineItems.data) {
            const productId = product.price?.product as string;
            const quantity = product.quantity as number;

            const { image, name, category, stock } = await client.fetch(
                `*[_type == "product" && _id == $id]{image, name, category -> {name}, stock}[0]`,
                { id: productId }
            );

            // Decrement stock in Sanity
            await client.patch(productId).dec({ stock: stock - quantity }).commit();

            // Add product details to the list
            products.push({
                productId,
                image,
                name,
                category: category.name,
                quantity,
                price: product.amount_total
            });
        }

        // Construct the shipping address
        const address: ShippingAddress = {
            name: customer_details?.name || '',
            phone: customer_details?.phone || '',
            addressLine1: customer_details?.address?.line1 || '',
            addressLine2: customer_details?.address?.line2 || '',
            cityLocality: customer_details?.address?.city || '',
            stateProvince: customer_details?.address?.state || '',
            postalCode: customer_details?.address?.postal_code || '',
            countryCode: customer_details?.address?.country || '',
            addressResidentialIndicator: "yes",
        };

        // Get shipping rates for the address
        const rates = await getRates(address);

        // Generate a shipping label using the first rate
        const label = await createLabel(rates[0].rateId);

        if (!label) {
            return NextResponse.json({ message: "Rate ID not found", rates });
        }

        // Track the parcel
        const trackingInfo = await trackParcel(label.labelId);

        // Send an email receipt to the customer
        await sendReceipt({
            tracking_id: trackingInfo?.trackingNumber || '',
            address: customer_details?.address?.line1 || '',
            name: customer_details?.name || '',
            order_number: '',
            username: customer_details?.name || '',
            created_at: new Date(),
            products: products,
            email: customer_details?.email || ''
        });

        // Save order details to Sanity
        await client.create({
            _type: "orders",
            username: customer_details?.name || '',
            email: customer_details?.email || '',
            phoneNo: customer_details?.phone || '',
            totalAmount: amount_total,
            paymentStatus: status,
            createdAt: new Date().toISOString(),
            products: products.map(item => ({
                product: {
                    productId: item.productId,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }
            })),
            shipping: {
                name: customer_details?.name || '',
                address: customer_details?.address?.line1 || '',
                city: customer_details?.address?.city || '',
                state: customer_details?.address?.state || '',
                postalCode: customer_details?.address?.postal_code || '',
                country: customer_details?.address?.country || '',
                shippingRate: rates[0].shippingAmount,
                trackingId: label.trackingNumber
            }
        });

        // Respond with success
        return NextResponse.json({ received: true }, { status: 200 });
    } catch (err) {
        console.error('Error processing webhook:', err);
        return NextResponse.json({
            success: false,
            message: "Invalid signature"
        }, { status: 400 });
    }
};
