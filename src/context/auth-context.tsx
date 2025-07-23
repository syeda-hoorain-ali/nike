'use client'

import { createContext, useContext } from 'react'
import { useSignUp, useSignIn, useUser, useAuth } from '@clerk/nextjs'
import { client } from '@/sanity/lib/client'
import { isClerkAPIResponseError } from '@clerk/nextjs/errors'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  username: string
  imageUrl?: string
}

interface AuthContextType {
  user: User | null
  sessionId: string | null
  isLoading: boolean
  isAuthenticated: boolean
  signUp: (data: SignUpData) => Promise<{ success: boolean; error?: string }>
  signIn: (data: SignInData) => Promise<{ success: boolean; error?: string }>
  signOut: () => Promise<void>
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (data: ResetPasswordData) => Promise<{ success: boolean; error?: string }>
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>
}

interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
  dateOfBirth: Date
  country: string
  gender: string
  emailConsesnt: boolean
}

interface SignInData {
  email: string
  password: string
}

interface ResetPasswordData {
  email: string
  code: string
  newPassword: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function NikeAuthProvider({ children }: { children: React.ReactNode }) {

  // Clerk hooks
  const { isLoaded: signUpLoaded, setActive, signUp: clerkSignUp } = useSignUp()
  const { isLoaded: signInLoaded, signIn: clerkSignIn } = useSignIn()
  const { user: clerkUser, isLoaded: userLoaded } = useUser()
  const { sessionId: clerkSessionId, signOut: clerkSignOut } = useAuth()

  // Loading state
  const isLoading = !(signUpLoaded && signInLoaded && userLoaded)

  // Map Clerk user to local User type
  const user: User | null = clerkUser ? {
    id: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    firstName: clerkUser.firstName || '',
    lastName: clerkUser.lastName || '',
    username: clerkUser.username || '',
    imageUrl: clerkUser.imageUrl,
  } : null

  const sessionId = clerkSessionId || null
  const isAuthenticated = !!user && !!sessionId

  const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!clerkSignUp) {
        return { success: false, error: 'Sign up not available' }
      }

      const result = await clerkSignUp.create({
        emailAddress: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        password: data.password,
        unsafeMetadata: { username: data.username },
      })

      if (!result) {
        return { success: false, error: 'Failed to create account' }
      }

      // Set the session as active
      if (setActive && result.createdSessionId) {
        await setActive({ session: result.createdSessionId })
      }

      // Create user in Sanity
      try {
        await client.create({
          _type: 'users',
          _id: result.createdUserId,
          userId: result.createdUserId,
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          fullName: `${data.firstName} ${data.lastName}`,
          imageUrl: clerkUser?.imageUrl,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          gender: data.gender,
          country: data.country,
          preferences: { newsletterSubscription: data.emailConsesnt },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      } catch (sanityError) {
        console.error('Failed to create user in Sanity:', sanityError)
        // Don't fail the signup if Sanity fails
      }

      return { success: true }

    } catch (error) {
      console.error('Sign up error:', error)
      let message = 'Failed to create account'
      if (isClerkAPIResponseError(error)) {
        message = error.errors?.[0]?.message || message
      }
      return { success: false, error: message }
    }
  }

  const signIn = async (data: SignInData): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!clerkSignIn) {
        return { success: false, error: 'Sign in not available' }
      }

      const result = await clerkSignIn.create({
        identifier: data.email,
        password: data.password,
      })

      if (result.status === 'complete') {
        return { success: true }
      }
      return { success: false, error: 'Sign in incomplete' }

    } catch (error) {
      console.error('Sign in error:', error)
      let message = 'Invalid credentials'
      if (isClerkAPIResponseError(error)) {
        message = error.errors?.[0]?.message || message
      }
      return { success: false, error: message }
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      if (sessionId) {
        await clerkSignOut({ sessionId: sessionId })
      }
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!clerkSignIn) {
        return { success: false, error: 'Sign in not available' }
      }

      await clerkSignIn.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })

      return { success: true }

    } catch (error) {
      console.error('Forgot password error:', error)
      let message = 'Failed to send reset email'
      if (isClerkAPIResponseError(error)) {
        message = error.errors?.[0]?.message || message
      }
      return { success: false, error: message }
    }
  }

  const resetPassword = async (data: ResetPasswordData): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!clerkSignIn) {
        return { success: false, error: 'Sign in not available' }
      }

      const result = await clerkSignIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code: data.code,
        password: data.newPassword,
      })

      if (result.status === 'complete') {
        return { success: true }
      }
      return { success: false, error: 'Password reset incomplete' }

    } catch (error) {
      console.error('Reset password error:', error)
      let message = 'Failed to reset password'
      if (isClerkAPIResponseError(error)) {
        message = error.errors?.[0]?.message || message
      }
      return { success: false, error: message }
    }
  }

  const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      if (!clerkSignIn) {
        return { success: false, error: 'Sign in not available' }
      }

      await clerkSignIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: '/auth/sign-in/sso-callback',
        redirectUrlComplete: '/auth/sign-in/sso-callback',
      })

      return { success: true }

    } catch (error) {
      console.error('Google sign in error:', error)
      let message = 'Failed to sign in with Google'
      if (isClerkAPIResponseError(error)) {
        message = error.errors[0]?.message || message
      }
      return { success: false, error: message }
    }
  }

  const value: AuthContextType = {
    user,
    sessionId,
    isLoading,
    isAuthenticated,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
    signInWithGoogle,
  }

  return <AuthContext.Provider value={value}>
    {children}
    <div id="clerk-captcha" />
  </AuthContext.Provider>
}

export function useNikeAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useNikeAuth must be used within an NikeAuthProvider')
  }
  return context
} 
