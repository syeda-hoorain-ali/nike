"use client";

import Loading from "@/app/loading";
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";

const Page = () => {
  const { signOut } = useAuth()

  useEffect(() => {
    signOut()
  }, [signOut])

  return <Loading />;
}

export default Page
