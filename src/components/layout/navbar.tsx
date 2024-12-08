import Link from "next/link"
import { HeartIcon, Logo, SearchIcon, ShoppingBagIcon } from "../icons"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { MenuIcon } from "lucide-react"

const Navbar = () => {
  const links = ['New & Featured', 'Men', 'Women', 'Kids', 'Sale', 'SNKRS']

  return (
    <nav className="max-w-screen-xl mx-auto py-4 pl-4 md:px-8 lg:px-0 flex items-center justify-between">
      <Link href='/'><Logo /></Link>

      <ul className="hidden lg:flex gap-4 translate-x-1/4 font-semibold">
        {links.map(text => (
          <li key={text}>
            <Link className="hover:underline underline-offset-2" href='/products'>{text}</Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-0 md:gap-2 items-center">
        <div className="relative">
          <Button variant="ghost" size="icon" className="lg:absolute top-0 left-0 rounded-full"><SearchIcon /></Button>
          <Input className="hidden lg:block rounded-full bg-muted pl-8 w-44" placeholder="Search" />
        </div>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Link className="hover:text-black" href='/cart'><HeartIcon /></Link>
        </Button>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Link className="hover:text-black" href='/cart'><ShoppingBagIcon /></Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden"><MenuIcon /></Button></SheetTrigger>

          <SheetContent>
            <ul className="flex flex-col gap-4 mt-8 font-semibold">
              {links.map(text => (
                <li key={text}>
                  <Link className="hover:underline underline-offset-2" href='/products'>{text}</Link>
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
