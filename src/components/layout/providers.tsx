"use client"

import { PropsWithChildren, useEffect, useState } from "react"
import { CartProvider as USCProvider, useShoppingCart } from "use-shopping-cart"
import { Logo } from "../icons"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { CheckoutProvider, useCheckout } from "@/context/checkout-context"
import { AuthProvider } from "@/context/auth-context"
import { getPaymentIntent } from "@/lib/data"
import { Loader2Icon } from "lucide-react"


const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          {children}
        </CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default Providers


export const StripeProvider = ({ children }: PropsWithChildren) => {

  if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_STRIPE_KEY')
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

  const { totalAmount } = useCheckout()
  const { currency } = useShoppingCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const clientSecret = await getPaymentIntent(totalAmount, currency!);
      setClientSecret(clientSecret);
      setLoading(false);
    };

    if (currency) fetch();

  }, [currency, totalAmount]);


  if (!clientSecret || loading) return <Loader2Icon size={10} className="animate-spin" />;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      {children}
    </Elements>
  )
}

export const CartProvider = ({ children }: PropsWithChildren) => {
  if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
    throw new Error('Missing environment variable: NEXT_PUBLIC_STRIPE_KEY')
  }

  return (
    <USCProvider
      mode="payment"
      cartMode="client-only" // to store cart data in localStorage
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY}
      successUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/success`}
      cancelUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/cancel`}
      currency="INR"
      language="en-US"
      persistKey="nike-cart"
      loading={<Logo />}
      shouldPersist // to store cart data in localStorage
      billingAddressCollection // to collect billing address from user
    >
      {children}
    </USCProvider>
  )
}
