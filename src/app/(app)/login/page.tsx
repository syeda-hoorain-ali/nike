"use client"

import { Logo } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { loginSchema } from "@/schema/loginSchema"
import { useSignIn } from "@clerk/nextjs";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { toast } from "react-toastify"

type FormData = z.infer<typeof loginSchema>

const Page = () => {

  const { signIn } = useSignIn();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data: FormData) => {

    type Error = { errors: { message: string }[] }

    try {

      const response = await signIn?.create({
        identifier: data.email,
        password: data.password,
        strategy: "password"
      })

      console.log(response)

    } catch (error) {
      console.error("error from login page");
      console.error(error);
      toast.error((error as Error).errors[0].message)
    }

  }


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

        <div className="flex flex-col gap-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

              <FormField
                name="password"
                render={(field) => (
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
                render={(field) => (
                  <FormItem>
                    {/* <FormLabel /> */}
                    <FormControl>
                      <Input {...field} className="rounded p-4 h-12" placeholder="Email address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </form>
          </Form>

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
          <Link className="underline hover:text-black transition" href='/privacy-policy'>Privacy Policy</Link> and {' '}
          <Link className="underline hover:text-black transition" href='/contact-us'>Terms of Use</Link>.
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

export default Page
