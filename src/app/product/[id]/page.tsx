import { CartIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import Image from "next/image"
import Link from "next/link";
import products from "../../../products.json";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>
}

const poppins = Poppins({ subsets: ["latin"], weight: ['400', '600'] });

const page = async ({ params }: Props) => {

  const { id } = await params;
  const product = products.find(item => item.id === parseInt(id))

  if (!product) notFound();

  return (
    <main className="max-w-screen-xl mx-auto my-12 px-12">
      <div className="grid gap-20 grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2">

        <Image className="rounded" src={product.image} alt={product.name} height={653} width={653} />

        <div className={`${poppins.className}`}>
          <h2 className="font-semibold text-5xl">{product.name}</h2>
          <p className="text-[#111] text-md mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus ea nobis quia soluta! Voluptatem porro 
            exercitationem aliquid magnam repellendus ducimus facilis consectetur. Animi dolores minima dolore quisquam id 
            tempore dolorem asperiores aperiam? Iusto voluptatem explicabo maiores voluptatibus aut quasi molestiae ullam quos 
            quod ut, adipisci et sunt soluta, expedita dignissimos laudantium id architecto consectetur assumenda inventore 
            necessitatibus blanditiis. Voluptates sint quia cumque dolorem blanditiis dignissimos debitis dolor hic cum in! Odit 
            non sit veniam placeat nam atque animi illum harum ratione et omnis cumque possimus recusandae optio, iure dolores 
            dolor dolore asperiores earum sunt quasi nulla consequatur deserunt ipsum?
          </p>

          <span className="block my-6 text-4xl">₹ {product.price}.00</span>
          <Link href='/cart'><Button size="lg"><CartIcon /> Add To Cart</Button></Link>
        </div>

      </div>
    </main>
  )
}

export default page
