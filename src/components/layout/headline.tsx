import Link from "next/link"
import { SportsMan } from "../icons"

const Headline = () => {
  return (
    <div className="w-full bg-muted">
      <div className="max-w-screen-xl mx-auto h-9 flex items-center justify-between">
        <SportsMan />

        <button className="bg-white px-2 py-1 text-sm lg:translate-x-full">Skip to main content</button>

        <div className="hidden lg:flex gap-2 text-sm">
          <Link href=''>Find a store</Link>
          <span>|</span>
          <Link href=''>Help</Link>
          <span>|</span>
          <Link href=''>Join us</Link>
          <span>|</span>
          <Link href=''>Sign in</Link>
        </div>

      </div>
    </div>
  )
}

export default Headline
