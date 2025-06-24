"use client"

import Headline from "@/components/layout/headline"
import Navbar from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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

  return (<>
    <Headline />
    <Navbar />
    <main className="min-h-[calc(100vh-6.5rem)] bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            We&apos;re experiencing some technical difficulties. Please try again.
          </p>
          {error.digest && (
            <p className="text-xs text-gray-400">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        {/* Helpful Information */}
        <div className="mb-8 p-4 bg-white rounded-lg border">
          <p className="text-sm text-gray-600 mb-2">
            What you can do:
          </p>
          <ul className="text-sm text-gray-500 text-left space-y-1">
            <li>• Check your internet connection</li>
            <li>• Try refreshing the page</li>
            <li>• Clear your browser cache</li>
            <li>• Contact support if the problem persists</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button
            onClick={reset}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Try Again
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white"
          >
            Go Back
          </Button>
        </div>

        {/* Alternative Navigation */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/">
            <Button variant="ghost" className="text-sm text-gray-600 hover:text-black">
              Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="ghost" className="text-sm text-gray-600 hover:text-black">
              Products
            </Button>
          </Link>
          <Link href="/contact-us">
            <Button variant="ghost" className="text-sm text-gray-600 hover:text-black">
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </main>
  </>)
}

export default Error
