"use client"

import { Logo } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { signupSchema } from "@/schema/signupSchema"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"


type FormData = z.infer<typeof signupSchema>


const Page = () => {

  const { signUp } = useSignUp();

  const form = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data: FormData) => {

    try {

      const response = await signUp?.create({
        emailAddress: data.email,
        password: data.password,
        strategy: "ticket"
      })

      console.log(response)

    } catch (error) {
      console.error("error from login page");
      console.error(error);
      toast.error((error as any).errors[0].message)
    }

  }


  return (
    <main className="max-w-sm mx-auto px-8 md:px-0 mb-10 flex flex-col items-center">

      <div className="flex flex-col gap-8 items-center my-8">
        <Logo />
        <h2 className="text-center text-lg font-bold uppercase">Become a nike member</h2>
        <p className="w-72 text-center text-[#8d8d8d]">Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="clerk-captcha" className="max-w-80 flex flex-col gap-6">

          <FormField
            name="password"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel /> */}
                <FormControl>
                  <Input {...field} className="rounded p-4 h-12" placeholder="Password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="email"
            render={({field}) => (
              <FormItem>
                {/* <FormLabel /> */}
                <FormControl>
                  <Input {...field} className="rounded p-4 h-12" placeholder="Email address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


            <Button>sign up</Button>

        </form>
      </Form>


      <form className="max-w-80 flex flex-col gap-6">
        <div className="flex flex-col gap-2">



          <Input className="rounded h-12 p-4" placeholder="Email address" />
          <Input className="rounded h-12 p-4" placeholder="Password" />
          <Input className="rounded h-12 p-4" placeholder="First Name" />
          <Input className="rounded h-12 p-4" placeholder="Last Name" />

          <div className="flex flex-col items-center gap-2">
            <Input className="rounded h-12 p-4" placeholder="Date of Birth" />
            <p className="text-xs text-[#8d8d8d]">Get a Nike Member Reward every year on your Birthday.</p>
          </div>

          <Select>
            <SelectTrigger className="w-full rounded h-12 p-4">
              <SelectValue placeholder="Country" className="text-muted-foreground" />
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

export default Page
