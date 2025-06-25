"use client";

import { useNikeAuth } from "@/context/auth-context";

const Page = () => {

  const { user } = useNikeAuth()
  console.log(user)


  return <p>Profile page under construction</p>
}

export default Page;
