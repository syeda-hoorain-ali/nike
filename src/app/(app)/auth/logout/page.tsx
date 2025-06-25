"use client";

import Loading from "@/app/loading";
import { useNikeAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  
  const { signOut } = useNikeAuth()
  const router = useRouter()

  useEffect(() => {
    signOut()
    router.push("/")
    router.refresh()
  }, [signOut, router])

  return <Loading />;
}

export default Page
