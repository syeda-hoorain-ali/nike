import CartProduct from "@/components/cart-product"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Inter } from "next/font/google"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] });

const page = () => {
  return (
    <main className="max-w-screen-lg mx-auto my-4 h-screen grid gap-8 grid-cols-[2fr_1fr]">
      <div className={inter.className}>

        <div className="p-4 flex flex-col bg-[#f7f7f7]">
          <span className="text-semibold text-sm">Free Delivery</span>
          <p className="text-xs text-[#111]">
            Applies to orders of ₹ 14 000.00 or more. {'  '}
            <Link className="underline" href='/contact-us'>View details</Link>
          </p>
        </div>

        <h2 className="text-2xl font-semibold mt-4">Bag</h2>

        <div className="flex flex-col">

          <CartProduct
            name="Nike Dri-FIT ADV TechKnit Ultra"
            category="Men's Short-Sleeve Running Top"
            colors="Ashen Slate/Cobalt Bliss"
            image="/images/product/nike-dri-fit-adv-techknit-ultra.png"
            size="L"
            price={3895}
            quantity={1}
          />

          <CartProduct
            name="Nike Air Max 97 SE"
            category="Men's Shoes"
            colors="Flat Pewter/Light Bone/Black/White"
            image="/images/product/nike-air-max-97-se.png"
            size="8"
            price={16995}
            quantity={1}
          />

        </div>

      </div>

      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold">Summary</h3>

        <div className="flex flex-col gap-3 text-md">
          <div className="flex justify-between items-center">
            <span>Subtotal</span>
            <span>₹ 20 890.00</span>
          </div>

          <div className="flex justify-between items-center">
            <span>Estimated Delivery & Handling</span>
            <span>Free</span>
          </div>

          <Separator className="my-2" />

          <div className="flex justify-between items-center">
            <span>Total</span>
            <span>₹ 20 890.00</span>
          </div>

          <Separator className="my-2" />
        </div>

        <Link href='/checkout'><Button className="h-10">Member Checkout</Button></Link>

      </div>
    </main>
  )
}

export default page
