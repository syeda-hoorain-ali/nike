import { sendReceipt } from '@/lib/email';
import { createLabel } from '@/lib/ship-engine';
import { client } from '@/sanity/lib/client';
import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server'

export const POST = async (request: NextRequest) => {

    try {
        const { products, address, rateId, totalAmount, shippingRate, carrierCode } = await request.json();
        const user = await currentUser()

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const sanityProducts = []

        // Update product stock and prepare product details
        for (const product of products) {
            const productId = product.id as string;
            const quantity = product.quantity as number;

            const { name, stock, price, category, image } = await client.fetch(
                `*[_type == "products" && _id == $id]
                  {name, stock, price, category->{name}, "image": image.asset->url}
                [0]`,
                { id: productId }
            );

            // Decrement stock in Sanity
            await client.patch(productId).dec({ stock: stock - quantity }).commit();

            // Add product details to the list
            sanityProducts.push({
                productId,
                name,
                image,
                category: category.name,
                price,
                quantity,
            });
        }


        // Generate a shipping label using the first rate
        const label = await createLabel(rateId);

        if (typeof label == 'string') {
            return NextResponse.json({
                success: false,
                message: label || "Error creating label"
            }, { status: 403 });
        }

        const name = `${address.firstName} ${address.lastName}`
        const orderNumber = await generateUniqueOrderNumber()
        // Send an email receipt to the customer
        await sendReceipt({
            tracking_id: label.trackingNumber,
            address: address.addressLine1,
            name: name,
            order_number: orderNumber,
            created_at: new Date(),
            products: sanityProducts,
            email: address.email,
            label: label.labelDownload.pdf
        });

        // Save order details to Sanity
        await client.create({
            _type: "orders",
            status: "pending",
            userId: user.id,
            orderNumber: orderNumber,
            username: user.username,
            email: address.email,
            phoneNo: address.phone,
            totalAmount: totalAmount,
            createdAt: new Date().toISOString(),
            products: sanityProducts.map(item => ({
                _key: item.productId,
                productId: item.productId,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity
            })),
            shipping: {
                name: name,
                address: address.addressLine1,
                city: address.city,
                state: address.state,
                postalCode: address.postalCode,
                pan: address.pan,
                country: address.country,
                shippingRate: shippingRate,
                carrierCode: carrierCode,
                trackingId: label.trackingNumber
            }
        });

        // Respond with success
        return NextResponse.json({
            success: true,
            message: "Order created successfully",
            label: label.labelDownload.pdf
        }, { status: 201 });

    } catch (err) {
        console.error('Internel server error', err);

        return NextResponse.json({
            success: false,
            message: (err as Error).message || "Internal server error"
        }, { status: 500 });
    }
};



// Utility functions

async function isorderNumberUnique(orderNumber: string) {
  const result = await client.fetch(
    `*[_type == "orders" && orderNumber == $orderNumber][0]`,
    { orderNumber }
  );
  return !result;
}


async function generateUniqueOrderNumber() {
    let orderNumber = '';
    let isUnique = false;

    while (!isUnique) {
        orderNumber = 'NK' + Math.floor(10000 + Math.random() * 90000);
        isUnique = await isorderNumberUnique(orderNumber);
    }
    return orderNumber;
}

