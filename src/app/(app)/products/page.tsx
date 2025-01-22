"use client";

import Card from "@/components/card"
import Filter from "@/components/filter"
import { FilterIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCallback, useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IProduct, SearchParams } from "@/types/data";
import { client } from "@/sanity/lib/client";
import CardSkeleton from "@/components/skeletons/card";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { generateGroqQuery } from "@/sanity/lib/query";

const Page = () => {

  const [products, setProducts] = useState<IProduct[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [params, setParams] = useState<SearchParams>({})
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    setParams({
      category: searchParams.get('category'),
      query: searchParams.get('query'),
      sort: searchParams.get('sort'),
      price: searchParams.get('price'),
      latest: Boolean(searchParams.get('latest')),
    })
  }, [searchParams])

  useEffect(() => {

    const fetchProducts = async () => {

      setIsLoading(true);
      const products: IProduct[] = await client.fetch(generateGroqQuery({ ...params, userQuery: params.query }));
      setProducts(products);
      setIsLoading(false);
    }

    fetchProducts()
  }, [params])

  const handleOrderChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(pathname + '?' + params)
  }, [searchParams, pathname, router])

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


          <Select defaultValue={params.sort || undefined} onValueChange={handleOrderChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Low to high</SelectItem>
              <SelectItem value="desc">High to low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>


      <div className="min-h-screen flex gap-12">
        <div className="hidden lg:block">
          <Filter showFilter={showFilter} />
        </div>


        <div className="w-full h-full">
          {params.query && <p className="mb-2">Showing results for {params.query}</p>}

          <div className="w-full h-full flex flex-wrap gap-4 px-4 md:px-8 lg:px-0">
            {isLoading ?
              <>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </> :

              products.length === 0 ?
                <div className="w-full flex flex-col items-center justify-center my-40">
                  <h2 className="text-xl font-semibold">No products found</h2>
                  <p className="text-lg">Try removing some filters</p>
                </div> :
                products.map(item => <Card key={item.id} {...item} />)
            }
          </div>
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
