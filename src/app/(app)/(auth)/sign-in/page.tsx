import SignInForm from "@/components/forms/sign-in";
import { Logo } from "@/components/icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Nike account.",
}

export default function Page() {
  return (<>
    <main className="max-w-sm mx-auto px-8 md:px-0 mb-10 flex flex-col items-center">

      <div className="flex flex-col gap-8 items-center my-8">
        <Logo />
        <h2 className="w-40 text-center text-lg font-bold uppercase">Your account for everything nike</h2>
      </div>

      <SignInForm />
    </main>
  </>)
}
