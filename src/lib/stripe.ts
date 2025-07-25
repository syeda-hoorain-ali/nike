import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing environment variable: STRIPE_SECRET_KEY');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-06-30.basil" });


export const createProduct = async (id: string, title: string, category: string, image: string) => {
    const product = await stripe.products.create({
        id: id,
        name: title,
        description: category,
        images: [image],
        url: `${process.env.BASE_URL}/product/${id}`,
        metadata: {
            sanityId: id, // Store Sanity's product ID in Stripe
        },
    });
    return product
}

export const createPrice = async (productId: string, price: number) => {
    const stripePrice = await stripe.prices.create({
        unit_amount: price * 100, // Price in cents
        currency: 'inr',
        product: productId,
    });
    return stripePrice
}

export const updateProduct = async (id: string, title: string, category: string, image: string) => {
    const updatedProduct = await stripe.products.update(id, {
        name: title,
        description: category,
        images: [image],
    });
    return updatedProduct
}

export const getProduct = (id: string) => stripe.products.retrieve(id).catch(() => null);
