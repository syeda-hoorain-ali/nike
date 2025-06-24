import { client } from "@/sanity/lib/client";
import { singleProductQuery } from "@/sanity/lib/query";
import { IProduct } from "@/types/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProductDetails from "@/components/product-details";

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  const { id } = await params;
  const product: IProduct = await client.fetch(singleProductQuery, { id });

  if (!product) {
    return {
      title: "Product not found",
    }
  }

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      url: `/product/${product.id}`,
    },
  }
}

async function getProduct(id: string) {
  const product: IProduct = await client.fetch(singleProductQuery, { id });
  return product;
}

export default async function Page({ params }: Props) {

  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="max-w-screen-xl mx-auto my-12 px-4 md:px-8 lg:px-12">
      <ProductDetails product={product} />
    </main>
  )
}
