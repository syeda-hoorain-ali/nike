"use client";

import Link from "next/link"
import { Separator } from "./ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"
import { Checkbox } from "./ui/checkbox"
import { Label } from "./ui/label"
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface FilterProps {
  showFilter: boolean
}

const Filter = ({ showFilter }: FilterProps) => {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handleGenderChange = useCallback((value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', value)
    router.push(pathname + '?' + params)
  }, [searchParams, pathname, router])

  return (
    <div className={cn("min-w-[12.5rem]", showFilter ? "block" : "hidden")}>

      <div className="h-96 pl-4 overflow-auto">
        <ul className="flex flex-col gap-2 text-md font-semibold">
          <li><Link href=''>Shoes</Link></li>
          <li><Link href=''>Sports bars</Link></li>
          <li><Link href=''>Top & t-shirts</Link></li>
          <li><Link href=''>Hoodies & sweatshirt</Link></li>
          <li><Link href=''>Jackets</Link></li>
          <li><Link href=''>Trousers & tights</Link></li>
          <li><Link href=''>Shorts</Link></li>
          <li><Link href=''>Tracksuits</Link></li>
          <li><Link href=''>Jumpsuits & rompers</Link></li>
          <li><Link href=''>Skirts & dresses</Link></li>
          <li><Link href=''>Socks</Link></li>
          <li><Link href=''>Accessories & equipment</Link></li>

          <li><Link href=''>Shoes</Link></li>
          <li><Link href=''>Sports bars</Link></li>
          <li><Link href=''>Top & t-shirts</Link></li>
          <li><Link href=''>Hoodies & sweatshirt</Link></li>
          <li><Link href=''>Jackets</Link></li>
          <li><Link href=''>Trousers & tights</Link></li>
          <li><Link href=''>Shorts</Link></li>
          <li><Link href=''>Tracksuits</Link></li>
          <li><Link href=''>Jumpsuits & rompers</Link></li>
          <li><Link href=''>Skirts & dresses</Link></li>
          <li><Link href=''>Socks</Link></li>
          <li><Link href=''>Accessories & equipment</Link></li>
        </ul>
      </div>

      <Separator className="mt-8" />

      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold">Gender</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <RadioGroup
              defaultValue={searchParams.get('category') || undefined}
              onValueChange={handleGenderChange}
            >
              <div className="flex gap-2">
                <RadioGroupItem value="men" id="men" />
                <Label htmlFor="men">Men</Label>
              </div>
              <div className="flex gap-2">
                <RadioGroupItem value="women" id="women" />
                <Label htmlFor="women">Women</Label>
              </div>
            </RadioGroup>

            <div className="flex gap-2"><Checkbox id="men" /><Label htmlFor="men">Men</Label></div>
            <div className="flex gap-2"><Checkbox id="women" /><Label htmlFor="women">Women</Label></div>
            <div className="flex gap-2"><Checkbox id="unisex" /><Label htmlFor="unisex">Unisex</Label></div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold">Kids</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <div className="flex gap-2"><Checkbox id="boys" /><Label htmlFor="boys">Boys</Label></div>
            <div className="flex gap-2"><Checkbox id="girls" /><Label htmlFor="girls">Girls</Label></div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold">Shop By Price</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            <div className="flex gap-2"><Checkbox id="low" /><Label htmlFor="low">Under ₹ 2 500.00</Label></div>
            <div className="flex gap-2"><Checkbox id="high" /><Label htmlFor="high">₹ 2 501.00 - ₹ 7 500.00</Label></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </div>
  )
}

export default Filter
