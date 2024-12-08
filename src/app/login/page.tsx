"use client"

import { Logo } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

const page = () => {
  return (
    <main className="max-w-sm mx-auto px-8 md:px-0 mb-10 flex flex-col items-center">

      <div className="flex flex-col gap-8 items-center my-8">
        <Logo />
        <h2 className="w-40 text-center text-lg font-bold uppercase">Your account for everything nike</h2>
      </div>

      <form className="max-w-80 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Input className="rounded p-4 h-12" placeholder="Password" />
          <Input className="rounded p-4 h-12" placeholder="Email address" />
        </div>

        <div className="flex flex-col gap-2 md:flex-row justify-normal md:justify-between items-center">
          <div className="flex items-center gap-1">
            <Checkbox id="checkbox" />
            <Label htmlFor="checkbox" className="text-[#8d8d8d] text-sm hover:text-black transition">Keep me signed in</Label>
          </div>

          <Link className="text-[#bcbcbc] text-xs hover:text-black transition" href='#'>Forgotten your password?</Link>
        </div>

        <p className="text-[#8d8d8d] text-sm text-center">
          By logging in, you agree to Nike&apos;s {' '}
          <Link className="underline hover:text-black transition" href='/contact-us'>Privacy Policy</Link> and {' '}
          <Link className="underline hover:text-black transition" href='/contatc-us'>Terms of Use</Link>.
        </p>

        <Button className="uppercase rounded">Sign in</Button>
        <p className="text-[#8d8d8d] text-sm text-center">
          Not a Member? {' '}
          <Link className="underline text-black" href='/signup'>Join Us</Link>.
        </p>

      </form>


    </main>
  )
}

export default page
