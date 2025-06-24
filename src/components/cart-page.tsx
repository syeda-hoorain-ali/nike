"use client";

import { useShoppingCart } from "use-shopping-cart";
import { ICartProduct } from "@/types/data";
import Link from "next/link";
import CartProduct from "@/components/cart-product";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function CartPage() {
  const { cartCount, cartDetails, formattedTotalPrice } = useShoppingCart();
  const cart: ICartProduct[] = Object.values(cartDetails ?? {}) as ICartProduct[];

  return (
    <main className="max-w-screen-lg mx-auto my-4 grid gap-8 grid-cols-1 lg:grid-cols-[2fr_1fr]">
      <div className={inter.className}>
        <div className="p-4 flex flex-col bg-[#f7f7f7]">
          <span className="text-semibold text-sm">Free Delivery</span>
          <p className="text-xs text-[#111]">
            Applies to orders of ₹ 14 000.00 or more. {'  '}
            <Link className="underline" href='/contact-us'>View details</Link>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-4 px-4 md:px-8 lg:px-0">Bag</h2>

        <div className="flex flex-col">
          {cartCount === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 py-12 p-4 md:p-8 lg:py-12">
              <p className="text-lg text-center">
                Your cart is empty. {' '}
                <Link href="/products" className="text-blue-600 underline underline-offset-2 hover:no-underline transition-all">Start shopping</Link>
              </p>
            </div>
          )}

          {cart.map(entry => (
            <CartProduct
              key={entry.id}
              id={entry.id}
              name={entry.name}
              category={entry.description!}
              colors={entry.product_data?.colors || []}
              image={entry.image!}
              size={entry.product_data?.sizes || []}
              price={entry.formattedValue!}
              quantity={entry.quantity}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 px-4 md:px-8 lg:px-0">
        <h3 className="text-xl font-semibold">Summary</h3>

        <div className="flex flex-col gap-3 text-md">
          <div className="flex justify-between items-center">
            <span>Subtotal</span>
            <span>{formattedTotalPrice || '₹0.00'}</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Estimated Delivery</span>
            <span>(calculated at checkout)</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between items-center">
            <span>Total</span>
            <span>{formattedTotalPrice || '₹0.00'}</span>
          </div>

          <Separator className="my-2" />
        </div>

        <Link href='/checkout'>
          <Button className="h-10" disabled={cartCount === 0}>Member Checkout</Button>
        </Link>
      </div>
    </main>
  )
} 