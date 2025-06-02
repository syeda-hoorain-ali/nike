"use client";

import Link from "next/link"
import Form from "next/form"
import { HeartIcon, Logo, SearchIcon, ShoppingBagIcon } from "../icons"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { MenuIcon } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const Navbar = () => {

  const searchParams = useSearchParams()
  const { cartCount } = useShoppingCart();
  const links = [
    { text: 'New & Featured', href: '/products?latest=true' },
    { text: 'Men', href: '/products?category=men' },
    { text: 'Women', href: '/products?category=women' },
    { text: 'Kids', href: '/products?category=kids' },
    { text: 'About', href: '/about' },
    { text: 'Sale', href: '/products' },
    { text: 'SNKRS', href: '/products?query=shoes' }
  ];

  return (
    <nav className="max-w-screen-xl w-full mx-auto py-4 pl-4 md:px-8 lg:px-0 flex items-center justify-between">
      <Link href='/'><Logo /></Link>

      <ul className="hidden lg:flex gap-4 translate-x-1/4 font-semibold">
        {links.map(({ text, href }) => (
          <li key={text}>
            <Link className="hover:underline underline-offset-2" href={href}>{text}</Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-0 md:gap-2 items-center">
        <Form action="/products" className="relative">
          <Button variant="ghost" size="icon" type="submit" className="lg:absolute top-0 left-0 rounded-full"><SearchIcon /></Button>

          <Input name="query" className="hidden lg:block rounded-full bg-muted pl-8 w-44" placeholder="Search" defaultValue={searchParams.get('query') || undefined} />
        </Form>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Link className="hover:text-black" href='/cart'><HeartIcon /></Link>
        </Button>

        <Button variant="ghost" size="icon" className="rounded-full relative">
          <Link className="hover:text-black" href='/cart'><ShoppingBagIcon /></Link>
          <span className={cn(
            "absolute right-0.5 top-0.5 flex items-center justify-center rounded-full size-3.5 bg-destructive text-[0.6rem] text-white",
            cartCount == 0 ? 'hidden' : 'flex'
          )}>
            {cartCount}
          </span>
        </Button>

        <Sheet>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden"><MenuIcon /></Button></SheetTrigger>

          <SheetContent>
            <ul className="flex flex-col gap-4 mt-8 font-semibold">
              {links.map(({ text, href }) => (
                <li key={text}>
                  <Link className="hover:underline underline-offset-2" href={href}>{text}</Link>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>


      </div>
    </nav>
  )
}

export default Navbar
