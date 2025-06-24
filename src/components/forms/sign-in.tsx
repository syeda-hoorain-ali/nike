"use client";

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SignInFormData, signInSchema } from "@/schema/signInSchema"
import { toast } from "react-toastify"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"

const SignInForm = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const router = useRouter()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data: SignInFormData) => {
    setError("")
    setIsLoading(true)

    try {
      const result = await signIn(data)

      if (result.success) {
        toast.success("Signed in successfully!")
        router.push("/")
      } else {
        setError(result.error || "Sign-in failed")
      }
    } catch (error) {
      console.error("Sign-in error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-80 flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="ml-1">Email</FormLabel>
                <FormControl>
                  <Input
                    className="rounded p-4 h-12"
                    placeholder="Email address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between">
                  <FormLabel className="ml-1">Password</FormLabel>
                  <Link className="text-[#bcbcbc] text-xs hover:text-black transition" href='/forgot-password'>
                    Forgotten your password?
                  </Link>
                </div>

                <FormControl>
                  <Input
                    className="rounded p-4 h-12"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-1 mb-1">
            <Checkbox id="checkbox" />
            <Label htmlFor="checkbox" className="text-[#8d8d8d] text-sm hover:text-black transition">Keep me signed in</Label>
          </div>

          {/* Error message for general errors */}
          {error && (
            <p className="-my-3 text-sm text-destructive text-center">{error}</p>
          )}

          <p className="text-[#8d8d8d] text-sm text-center">
            By logging in, you agree to Nike&apos;s {' '}
            <Link className="underline hover:text-black transition" href='/privacy-policy'>Privacy Policy</Link> and {' '}
            <Link className="underline hover:text-black transition" href='/contact-us'>Terms of Use</Link>.
          </p>

          <Button
            type="submit"
            className="uppercase rounded"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <p className="text-[#8d8d8d] text-sm text-center">
            Not a Member? {' '}
            <Link className="underline text-black" href='/join-us'>Join Us</Link>.
          </p>
        </form>
      </Form>
    </>
  )
}

export default SignInForm
