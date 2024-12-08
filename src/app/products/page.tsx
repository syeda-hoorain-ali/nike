"use client";

import Card from "@/components/card"
import Filter from "@/components/filter"
import { FilterIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react";
import products from '../../products.json';

const Page = () => {
  const [showFilter, setShowFilter] = useState<boolean>(true)

  return (
    <main className="max-w-screen-xl mx-auto my-12">

      <div className="flex justify-between mb-8 px-4 md:px-8 lg:px-0">
        <h3 className="text-xl md:text-2xl font-semibold">New (500)</h3>

        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => setShowFilter(v => !v)} className="hidden md:block">
            {showFilter ? "Hide Filters" : "Show Filters"}
            <FilterIcon />
          </Button>

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

          {products.map(item => (
            <Card key={item.id} {...item} />
          ))}

          {/* <Card
            id={5}
            name="Nike Dri-FIT ADV TechKnit Ultra"
            category="Men's Short-Sleeve Running Top"
            colors={2}
            image="/images/product/nike-dri-fit-adv-techknit-ultra.png"
            price={3895}
          /> */}

        </div>

      </div>

    </main>
  )
}

export default Page
