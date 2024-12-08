import Link from "next/link"
import { HeartIcon, Logo, SearchIcon, ShoppingBagIcon } from "../icons"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

const Navbar = () => {
  return (
    <nav className="max-w-screen-xl mx-auto py-4 flex items-center justify-between">
      <Link href='/'><Logo /></Link>

      <ul className="flex gap-4 translate-x-1/4">
        <li><Link className="font-semibold hover:underline underline-offset-2" href='/products'>New & Featured</Link></li>
        <li><Link className="font-semibold hover:underline underline-offset-2" href='/products'>Men</Link></li>
        <li><Link className="font-semibold hover:underline underline-offset-2" href='/products'>Women</Link></li>
        <li><Link className="font-semibold hover:underline underline-offset-2" href='/products'>Kids</Link></li>
        <li><Link className="font-semibold hover:underline underline-offset-2" href='/products'>Sale</Link></li>
        <li><Link className="font-semibold hover:underline underline-offset-2" href='/products'>SNKRS</Link></li>
      </ul>


      <div className="flex gap-2 items-center">
        <div className="relative">
          <Button variant="ghost" size="icon" className="absolute top-0 left-0 rounded-full"><SearchIcon /></Button>
          <Input className="rounded-full bg-muted pl-8 w-44" placeholder="Search" />
        </div>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Link className="hover:text-black" href='/cart'><HeartIcon /></Link>
        </Button>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Link className="hover:text-black" href='/cart'><ShoppingBagIcon /></Link>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
