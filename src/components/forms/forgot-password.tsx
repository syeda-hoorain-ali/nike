"use client"

import { useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { emailSchema, EmailFormData, resetPasswordSchema, ResetPasswordFormData } from "@/schema/forgotPasswordSchema"
import { useNikeAuth } from "@/context/auth-context"

const ForgotPasswordForm = () => {
  const [error, setError] = useState("")
  const [successfulCreation, setSuccessfulCreation] = useState(false)
  const [email, setEmail] = useState("")

  const router = useRouter()
  const { forgotPassword, resetPassword } = useNikeAuth()

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  })

  const resetPasswordForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { code: "", newPassword: "", confirmPassword: "" },
  })

  const onEmailSubmit = async (data: EmailFormData) => {
    setError("")

    const result = await forgotPassword(data.email)

    if (result.success) {
      setEmail(data.email)
      setError("")
      setSuccessfulCreation(true)
    } else {
      setError(result.error || "Failed to send reset email")
    }
  }

  const onCodeSubmit = async (data: ResetPasswordFormData) => {
    setError("")

    const result = await resetPassword({
      email,
      code: data.code,
      newPassword: data.newPassword,
    })

    if (result.success) {
      setError("")
      router.push("/auth/sign-in")
    } else {
      setError(result.error || "Failed to reset password")
    }
  }

  if (!successfulCreation) {
    return (
      <Form {...emailForm}>
        <form
          onSubmit={emailForm.handleSubmit(onEmailSubmit)}
          className="w-full max-w-80 flex flex-col gap-6"
        >
          <FormField
            control={emailForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="you@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="-my-3 text-sm text-destructive text-center">{error}</p>
          )}
          <Button
            type="submit"
            className="uppercase rounded"
            disabled={emailForm.formState.isSubmitting}
          >
            {emailForm.formState.isSubmitting
              ? "Sending..."
              : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    )
  }

  return (
    <Form {...resetPasswordForm}>
      <p className="text-center text-sm text-muted-foreground">
        Enter the code sent to {email}
      </p>
      <form
        onSubmit={resetPasswordForm.handleSubmit(onCodeSubmit)}
        className="w-full max-w-80 flex flex-col gap-6"
      >
        <FormField
          control={resetPasswordForm.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup className="w-full justify-between">
                    <InputOTPSlot className="border rounded-md" index={0} />
                    <InputOTPSlot className="border rounded-md" index={1} />
                    <InputOTPSlot className="border rounded-md" index={2} />
                    <InputOTPSeparator />
                    <InputOTPSlot className="border rounded-md" index={3} />
                    <InputOTPSlot className="border rounded-md" index={4} />
                    <InputOTPSlot className="border rounded-md" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="newPassword"
          control={resetPasswordForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={resetPasswordForm.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <p className="-my-3 text-sm text-destructive text-center">{error}</p>
        )}
        <Button
          type="submit"
          className="uppercase rounded"
          disabled={resetPasswordForm.formState.isSubmitting}
        >
          {resetPasswordForm.formState.isSubmitting
            ? "Resetting..."
            : "Reset Password"}
        </Button>
      </form>
    </Form>
  )
}

export default ForgotPasswordForm
