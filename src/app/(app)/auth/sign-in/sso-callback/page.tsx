'use client'

import { useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { toast } from 'react-toastify'
import Loading from '@/app/loading'

export default function SSOCallbackPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  // Log at every render
  console.log("user:", user)
  console.log("isLoaded:", isLoaded)

  useEffect(() => {
    console.log("Inside use effect!!!", { isLoaded, user })
    if (!isLoaded) return
    if (!user) {
      console.log("No user after isLoaded=true. Redirecting to sign-in.")
      // router.replace('/auth/sign-in')
      return
    }

    const createSanityUserIfNotExists = async () => {
      try {
        const sanityUser = await client.createIfNotExists({
          _type: 'users',
          _id: user.id,
          userId: user.id,
          username: user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          fullName: user.firstName && user.lastName
            ? `${user.firstName} ${user.lastName}`
            : user.firstName || user.lastName || user.username || '',
          imageUrl: user.imageUrl,
          email: user.primaryEmailAddress?.emailAddress || '',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        console.log("User created!!!")
        console.log(sanityUser)
        toast.success("Signed up with Google!")
        router.replace('/')
      } catch (err) {
        console.error("Failed to create user in Sanity:", err)
        toast.error("Failed to save user profile. Please contact support.")
        // Optionally redirect or handle error
      }
    }
    
    console.log("Creating user!!!")
    createSanityUserIfNotExists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, user])

  return (
    <>
      <AuthenticateWithRedirectCallback />
      <Loading />
    </>
  )
}
