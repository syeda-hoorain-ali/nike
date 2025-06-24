"use client";

import Link from "next/link"
import { SportsMan } from "../icons"
import { useAuth } from "@/context/auth-context";

const Headline = () => {
  const { isAuthenticated, user, signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
  }

  return (
    <div className="w-full bg-muted">
      <div className="max-w-screen-xl mx-auto h-9 flex items-center justify-between">
        <SportsMan />

        <button className="hidden lg:inline bg-white px-2 py-1 text-sm lg:translate-x-full">Skip to main content</button>

        <div className="flex gap-2 text-sm mx-2">
          <Link href='/'>Find a store</Link>
          <span>|</span>
          <Link href='/contact-us'>Help</Link>
          <span>|</span>

          {isAuthenticated && user ?
            <>
              <Link href='/profile'>{user.firstName} {user.lastName}</Link>
              <span>|</span>
              <button onClick={handleSignOut} className="hover:underline">Logout</button>
            </> :
            <>
              <Link href='/join-us'>Join us</Link>
              <span>|</span>
              <Link href='/sign-in'>Sign in</Link>
            </>
          }
        </div>

      </div>
    </div>
  )
}

export default Headline
