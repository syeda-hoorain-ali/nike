"use client";

import Card from "@/components/card"
import Filter from "@/components/filter"
import { FilterIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IProduct } from "@/types/data";
import { client } from "@/sanity/lib/client";
import CardSkeleton from "@/components/skeletons/card";

const Page = () => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {

      setIsLoading(true);
      const products: IProduct[] = await client.fetch(`*[_type == "products"]{
        "id": _id, 
        "image": image.asset->url,
        name,
        price,
        label,
        colors,
        category -> { name }
      }`);
      setProducts(products);
      setIsLoading(false);
    }

    fetchProducts()
  }, [])

  return (
    <main className="max-w-screen-xl mx-auto my-12">

      <div className="flex justify-between mb-8 px-4 md:px-8 lg:px-0">
        <h3 className="text-xl md:text-2xl font-semibold">New (500)</h3>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setShowFilter(v => !v)} className="hidden lg:flex">
            {showFilter ? "Hide Filters" : "Show Filters"}
            <FilterIcon />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="flex lg:hidden">
                <span className="hidden md:inline">Show Filters</span>
                <FilterIcon />
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <Filter showFilter />
            </SheetContent>
          </Sheet>


          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <div className="min-h-screen flex gap-12">
        <div className="hidden lg:block">
          <Filter showFilter={showFilter} />
        </div>


        <div className="flex flex-wrap gap-4 px-4 md:px-8 lg:px-0">
          {isLoading ?
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </> :

            products.map(item => <Card key={item.id} {...item} />)
          }
        </div>

        {/* <Card
          id={5}
          name="Nike Dri-FIT ADV TechKnit Ultra"
          category="Men's Short-Sleeve Running Top"
          colors={2}
          image="/images/product/nike-dri-fit-adv-techknit-ultra.png"
          price={3895}
        /> */}

      </div>
    </main>
  )
}

export default Page
