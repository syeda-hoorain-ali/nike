"use client"

import { Logo } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Link from "next/link"

const page = () => {
  return (
    <main className="max-w-sm mx-auto mb-10 flex flex-col items-center">

      <div className="flex flex-col gap-8 items-center my-8">
        <Logo />
        <h2 className="text-center text-lg font-bold uppercase">Become a nike member</h2>
        <p className="w-72 text-center text-[#8d8d8d]">Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.</p>
      </div>

      <form className="max-w-80 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Input className="rounded" placeholder="Email address" />
          <Input className="rounded" placeholder="Password" />
          <Input className="rounded" placeholder="First Name" />
          <Input className="rounded" placeholder="Last Name" />

          <div className="flex flex-col items-center gap-2">
            <Input className="rounded" placeholder="Date of Birth" />
            <p className="text-xs text-[#8d8d8d]">Get a Nike Member Reward every year on your Birthday.</p>
          </div>

          <Select>
            <SelectTrigger className="w-full rounded">
              <SelectValue placeholder="Country" className="text-muted-foreground"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pakistan">Pakistan</SelectItem>
            </SelectContent>
          </Select>

          <ToggleGroup className="grid grid-cols-2 gap-2" type="single" variant="outline" size="lg">
            <ToggleGroupItem className="text-muted-foreground" value="male">Male</ToggleGroupItem>
            <ToggleGroupItem className="text-muted-foreground" value="female">Female</ToggleGroupItem>
          </ToggleGroup>

        </div>

        <div className="flex items-start gap-2">
          <Checkbox id="checkbox" className="mt-1" />
          <Label htmlFor="checkbox" className="text-[#8d8d8d] text-sm hover:text-black transition">
            Sign up for emails to get updates from Nike on products, offers and your Member benefits
          </Label>
        </div>

        <p className="text-[#8d8d8d] text-sm text-center">
          By logging in, you agree to Nike&apos;s {' '}
          <Link className="underline hover:text-black transition" href='/contact-us'>Privacy Policy</Link> and {' '}
          <Link className="underline hover:text-black transition" href='/contact-us'>Terms of Use</Link>.
        </p>

        <Button className="uppercase rounded">Join us</Button>
        <p className="text-[#8d8d8d] text-sm text-center">
          Already a Member? {' '}
          <Link className="underline text-black" href='/login'>Sign In</Link>.
        </p>

      </form>


    </main>
  )
}

export default page
