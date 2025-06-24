"use client"

import Headline from "@/components/layout/headline"
import Navbar from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (<>
    <Headline />
    <Navbar />

    <main className="min-h-[calc(100vh-6.5rem)] bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Nike Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold text-gray-200">404</h1>
        </div>

        {/* Main Message */}
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Helpful Links */}
        <div className="mb-8">
          <p className="text-gray-500 mb-4">Try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/">
              <Button variant="outline" className="text-sm">
                Home
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="text-sm">
                Products
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="text-sm">
                About
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button variant="outline" className="text-sm">
                Contact
              </Button>
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.back()}
            className="bg-black hover:bg-gray-800 text-white"
          >
            Go Back
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white"
            >
              Go to Homepage
            </Button>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="mt-8 p-4 bg-white rounded-lg border">
          <p className="text-sm text-gray-600 mb-2">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Link href="/products">
            <Button
              variant="ghost"
              className="text-black underline hover:no-underline"
            >
              Browse our products →
            </Button>
          </Link>
        </div>
      </div>
    </main>
  </>)
} 
