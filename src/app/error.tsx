"use client" 

import Headline from "@/components/layout/headline"
import Navbar from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

const Error = ({ error, reset }: Props) => {

  const router = useRouter()

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <>
      <Headline />
      <Navbar />
      <div className="h-[calc(100vh-6.5rem)] pb-16 bg-blue-300 flex gap-5 flex-col items-center justify-center">
        <h2 className="text-2xl md:text-4xl font-bold">Something went wrong!</h2>

        <div className="flex gap-4">
          <Button onClick={router.back}>
            Go back
          </Button>

          <Button onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </>
  )
}

export default Error
