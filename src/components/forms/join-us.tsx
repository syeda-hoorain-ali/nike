"use client"

import Link from "next/link"
import { CalendarIcon, EyeClosedIcon, EyeIcon } from "lucide-react"
import { format } from "date-fns"
import { toast } from "react-toastify"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { JoinUsFormData, joinUsSchema } from "@/schema/joinUsSchema"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useNikeAuth } from "@/context/auth-context"

const JoinUsForm = () => {
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signUp } = useNikeAuth()
  const router = useRouter()


  const form = useForm<JoinUsFormData>({
    resolver: zodResolver(joinUsSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      country: "",
      gender: "",
      emailConsent: false,
    }
  })

  const onSubmit = async (data: JoinUsFormData) => {
    setError("")
    setIsLoading(true)

    try {
      const result = await signUp({
        ...data,
        emailConsesnt: data.emailConsent,
        username: data.email.split("@")[0],
      })

      if (result.success) {
        toast.success("Account created successfully!")
        router.push("/")
        router.refresh()
      } else {
        setError(result.error || "Failed to create account")
      }
    } catch (error) {
      console.error("Sign-up error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }


  return (<>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-80 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Email address"
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
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                  </FormControl>
                  <Button
                    size="icon"
                    type="button"
                    variant="ghost"
                    className="absolute top-1.5 right-2"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Last Name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col items-center gap-2">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full rounded h-12 p-4 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p className="text-xs text-[#8d8d8d]">Get a Nike Member Reward every year on your Birthday.</p>
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full rounded h-12 p-4">
                      <SelectValue placeholder="Country" className="text-muted-foreground" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="pakistan">Pakistan</SelectItem>
                    <SelectItem value="bangladesh">Bangladesh</SelectItem>
                    <SelectItem value="sri-lanka">Sri Lanka</SelectItem>
                    <SelectItem value="nepal">Nepal</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ToggleGroup
                    type="single"
                    variant="outline"
                    size="lg"
                    className="grid grid-cols-2 gap-2"
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <ToggleGroupItem className="text-muted-foreground" value="male">Male</ToggleGroupItem>
                    <ToggleGroupItem className="text-muted-foreground" value="female">Female</ToggleGroupItem>
                  </ToggleGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <FormField
          control={form.control}
          name="emailConsent"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-start gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                </FormControl>
                <FormLabel className="text-[#8d8d8d] text-sm hover:text-black transition cursor-pointer">
                  Sign up for emails to get updates from Nike on products, offers and your Member benefits
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Error message for general errors */}
        {error && (
          <p className="-my-3 text-sm text-destructive text-center">{error}</p>
        )}

        <p className="text-[#8d8d8d] text-sm text-center">
          By creating an account, you agree to Nike&apos;s {' '}
          <Link className="underline hover:text-black transition" href='/privacy-policy'>Privacy Policy</Link> and {' '}
          <Link className="underline hover:text-black transition" href='/contact-us'>Terms of Use</Link>.
        </p>

        <Button
          type="submit"
          className="uppercase rounded"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Join Us"}
        </Button>



        <p className="text-[#8d8d8d] text-sm text-center">
          Already have an account? {' '}
          <Link className="underline text-black" href='/authsign-in'>Sign In</Link>.
        </p>
      </form>
    </Form>
  </>
  )
}

export default JoinUsForm
