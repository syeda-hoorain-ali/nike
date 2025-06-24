"use client"

import AddressForm from "@/components/forms/address-form";
import PaymentForm from "@/components/forms/payment-form";
import RatesForm from "@/components/forms/rates-form";
import { PackageIcon } from "@/components/icons";
import { StripeProvider } from "@/components/layout/providers";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { useCheckout } from "@/context/checkout-context";
import { ICartProduct } from "@/types/data";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useShoppingCart, formatCurrencyString } from "use-shopping-cart";

const inter = Inter({ subsets: ["latin"] });

export default function CheckoutPage() {
  const { accordionValue, shippingAmount, totalAmount } = useCheckout()
  const { formattedTotalPrice, cartDetails } = useShoppingCart()

  const cart = Object.values(cartDetails ?? {}) as ICartProduct[]

  return (
    <main className={`${inter.className} max-w-screen-lg mx-auto my-12 px-4 md:px-8 lg:px-20`}>
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-20">

        <div>
          <h2 className="text-xl font-semibold mb-4">How would you like to get your order?</h2>
          <p className="text-[#757575] text-md">Customs regulation for India require a copy of the recipient&apos;s KYC. The address on the KYC needs to match the shipping address. Our courier will contact you via SMS/email to obtain a copy of your KYC. The KYC will be stored securely and used solely for the purpose of clearing customs (including sharing it with customs officials) for all orders and returns. If your KYC does not match your shipping address, please click the link for more information. <Link href='/contact-us' className="underline underline-offset-4">Learn More</Link></p>

          <div className="border-foreground border-2 rounded-xl py-7 px-5 my-8 flex gap-4 items-center">
            <PackageIcon /> <span>Deliver It</span>
          </div>


          <Accordion type="single" value={accordionValue}>
            <AccordionItem value="address">
              <AccordionTrigger><h4 className="text-xl font-semibold">Delivery</h4></AccordionTrigger>
              <AccordionContent>
                <AddressForm />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="rates">
              <AccordionTrigger><h4 className="text-xl font-semibold">Rates</h4></AccordionTrigger>
              <AccordionContent>
                <RatesForm />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment">
              <AccordionTrigger><h4 className="text-xl font-semibold">Payment</h4></AccordionTrigger>
              <AccordionContent>
                <StripeProvider>
                  <PaymentForm />
                </StripeProvider>
              </AccordionContent>
            </AccordionItem>

          </Accordion>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Order summary</h2>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-[#8d8d8d]">
              <span>Subtotal</span>
              <span>{formattedTotalPrice}</span>
            </div>

            <div className="flex justify-between text-[#8d8d8d]">
              <span>Delivery/Shipping</span>
              <span>{formatCurrencyString({ value: shippingAmount, currency: 'INR' })}</span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span>Total</span>
              <span>{formatCurrencyString({ value: totalAmount, currency: 'INR' })}</span>
            </div>
            <Separator />
          </div>

          <p className="text-[9px] my-2">(The total reflects the price of your order, including all duties and taxes)</p>

          <h3 className="font-bold my-4">Arrives Mon, 27 Mar - Wed, 12 Apr</h3>

          {cart.map(product => (
            <div className="card flex gap-2 mb-2" key={product.id}>
              <Image src={product.image as string} alt="" height={208} width={208} />
              <div className="flex flex-col">
                <p className="text-sm">{product.name}</p>
                <span className="text-sm text-[#8d8d8d]">Qty {product.quantity}</span>
                <span className="text-sm text-[#8d8d8d]">Size {product.product_data?.sizes?.join(' ') || 'M'}</span>
                <span className="text-sm text-[#8d8d8d]">{formatCurrencyString({ value: product.price, currency: 'INR' })}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
} 