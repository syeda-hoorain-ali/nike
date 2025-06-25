import JoinUsForm from "@/components/forms/join-us";
import { Logo } from "@/components/icons";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a nike member",
  description: "Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.",
}

export default function Page() {
  return (<>
    <main className="max-w-sm mx-auto px-8 md:px-0 mb-10 flex flex-col items-center">

      <div className="flex flex-col gap-2 items-center my-8">
        <Logo />
        <h2 className="text-center text-lg font-bold uppercase mt-1">Become a nike member</h2>
        <p className="w-72 text-center text-[#8d8d8d]">Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community.</p>
      </div>

      <JoinUsForm />
    </main>
  </>)
}
