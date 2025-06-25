import ForgotPasswordForm from "@/components/forms/forgot-password";
import { Logo } from "@/components/icons";

export default function ForgotPassword() {
  return (<>
    <main className="max-w-sm mx-auto px-8 md:px-0 mb-10 flex flex-col items-center">
      <div className="flex flex-col gap-4 items-center my-8">
        <Logo />
        <h2 className="text-center text-lg font-bold uppercase mt-4">Forgot Password?</h2>
        <p className="w-[22rem] text-center text-[#8d8d8d]">
          No problem. Enter your email address below and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      <ForgotPasswordForm />
    </main>
  </>)
}
