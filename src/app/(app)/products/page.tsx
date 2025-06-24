import { client } from "@/sanity/lib/client";
import { generateGroqQuery } from "@/sanity/lib/query";
import { IProduct, SearchParams } from "@/types/data";
import { Metadata } from "next";
import ProductsList from "@/components/products-list";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const metadata: Metadata = {
  title: "Products",
  description: "Explore our wide range of Nike products.",
};

async function getProducts(params: SearchParams) {
  const products: IProduct[] = await client.fetch(generateGroqQuery({ ...params, userQuery: params.query }));
  return products;
}

export default async function Page({ searchParams }: Props) {
  
  const params = await searchParams
  const products = await getProducts(params);

  return (
    <main className="max-w-screen-xl mx-auto my-12">
      <ProductsList products={products} isLoading={false} />
    </main>
  )
}
