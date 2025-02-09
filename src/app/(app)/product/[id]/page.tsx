"use client"
import { Poppins } from "next/font/google";
import Image from "next/image"
import Link from "next/link";
import { notFound } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ICartProduct, IProduct } from "@/types/data";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import ProductPageSkeleton from "@/components/skeletons/product-page";
import { Product } from "use-shopping-cart/core";
import { Button } from "@/components/ui/button";
import { CartIcon } from "@/components/icons";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-toastify";
import { singleProductQuery } from "@/sanity/lib/query";

interface Props {
  params: Promise<{ id: string }>
}

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '600'] });

const Page = ({ params }: Props) => {

  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addItem, cartDetails } = useShoppingCart();
  const cart: ICartProduct[] = Object.values(cartDetails ?? {}) as ICartProduct[]
  
  useEffect(() => {
    
    const fetchProduct = async () => {
      setLoading(true)
      const { id } = await params;
      const product = await client.fetch(singleProductQuery, { id });
      setProduct(product);
      setLoading(false);
    }

    fetchProduct()
  }, [params])

  if (loading) return <ProductPageSkeleton />
  if (!product) notFound();
  
  const cartProduct: Product = {
    price_id: product.price_id,
    name: product.name,
    description: product.category.name,
    image: product.image,
    price: product.price * 100,
    currency: 'INR',
    product_data: {
      colors: product.colors,
      size: product.size,
      product_id: product.id
    },
  }
  
  const addToCart = () => {
    if (product.stock < 1) {
      toast.error("Out of stock");
      return;
    }
    
    const item = cart.find(item => item.id === product.id)

    if(item && item.quantity <= 10) {
      toast.error("You cannot purchase more than 10 units of this product.");
      return
    }

    addItem(cartProduct);
    toast.success('Product added to cart!')
    setProduct(prev => {
      if (!prev) return null
      return { ...prev, stock: prev.stock - 1 }
    })
  }

  return (
    <main className="max-w-screen-xl mx-auto my-12 px-4 md:px-8 lg:px-12">
      <div className="grid gap-20 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2">

        <Image className="rounded" src={product.image} alt={product.name} height={653} width={653} />

        <div className={poppins.className}>
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl">{product.name}</h2>
          <p className="text-[#111] text-md mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus ea nobis quia soluta! Voluptatem porro
            exercitationem aliquid magnam repellendus ducimus facilis consectetur. Animi dolores minima dolore quisquam id
            tempore dolorem asperiores aperiam? Iusto voluptatem explicabo maiores voluptatibus aut quasi molestiae ullam quos
            quod ut, adipisci et sunt soluta, expedita dignissimos laudantium id architecto consectetur assumenda inventore
            necessitatibus blanditiis. Voluptates sint quia cumque dolorem blanditiis dignissimos debitis dolor hic cum in! Odit
            non sit veniam placeat nam atque animi illum harum ratione et omnis cumque possimus recusandae optio, iure dolores
            dolor dolore asperiores earum sunt quasi nulla consequatur deserunt ipsum?
          </p>

          <span className="block my-6 text-3xl lg:text-4xl">₹ {product.price}.00</span>

          <span className="block my-2 font-semibold">
            {product.stock == 0 ? 'Out of stock' : `${product.stock} pieces availabel`}
          </span>

          <Button size="lg" onClick={addToCart}>
            <CartIcon /> Add To Cart
          </Button>

          <Accordion type="single" collapsible className="my-8">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-base">Delivary & Returns</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4">
                <p>Free delivery for purchases above ₹14,000.00</p>
                <p>Standard delivery 4–9 Business Days</p>
                <p>Orders are processed and delivered Monday–Friday (excluding public holidays)</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold text-base">Reviews (49)</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-8">
                <span className="text-center">5.8 Stars</span>
                <Link className="underline underline-offest-2 hover:no-underline" href=''>Write a Review</Link>

                <div className="flex flex-col gap-2">
                  <strong className="font-semibold">Kool Kicks</strong>
                  <p className="text-muted-foreground translate-x-1/3">RSM848779363 - 15 Dec 2022</p>
                  <p>Pretty impressed with the mix of materials used on this tastefully colour-blocked AJ1 Mids. Not sure how durable they are compared with the usual cheap (faux) leather you got on regular Mids, but a few years of fair use can be easily hard if there&apos;s little abuse.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <strong className="font-semibold">Perfect!</strong>
                  <p className="text-muted-foreground translate-x-1/3">Watsonathan - 02 Nov 2022</p>
                  <p>Perfect! Great fit and look better in person. So glad I got them.</p>
                </div>

                <div className="flex flex-col gap-2">
                  <strong className="font-semibold">Another pair of J1s</strong>
                  <p className="text-muted-foreground translate-x-1/3">JustinOKC - 02 Nov 2022</p>
                  <p>Decent quality for J1s but I get what they&apos;re trying to do here. Might not get a while lot of wears.</p>
                </div>

                <Link className="font-semibold underline underline-offset-2 hover:no-underline" href=''>More Reviews</Link>

              </AccordionContent>
            </AccordionItem>


            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold text-base">Product Information</AccordionTrigger>
              <AccordionContent>
                <p className="mb-4 leading-relaxed">Declaration of Importer: Direct import by the individual customer <br /> <br /> Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440</p>
                <b>Net Quantity: 1 Pair</b>
              </AccordionContent>
            </AccordionItem>


            <AccordionItem value="item-4">
              <AccordionTrigger className="font-semibold text-base">More Info</AccordionTrigger>
              <AccordionContent>

              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <p className="underline underline-offset-2">Limited to (10) pair per consumer</p>

        </div>

      </div>
    </main>
  )
}

export default Page
