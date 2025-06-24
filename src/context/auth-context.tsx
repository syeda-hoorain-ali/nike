'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { getCookie, deleteCookie } from '@/lib/cookies'

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()


  // Check for existing session on mount (from cookies)
  useEffect(() => {
    (async () => {
      try {

        const sessionId = await getCookie('sessionId')
        const userCookie = await getCookie('user')

        if (sessionId && userCookie) {
          setSessionId(sessionId)
          setUser(JSON.parse(decodeURIComponent(userCookie)))
        }

      } catch (error) {
        console.error('Error checking session:', error)
        await deleteCookie('sessionId')
        await deleteCookie('user')

      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  const signUp = async (data: SignUpData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await axios.post('/api/auth/sign-up', data)
      const result = response.data

      if (response.status === 200) {
        setUser(result.user)
        setSessionId(result.sessionId)
        // Cookies set by backend
        return { success: true }
      }

      return { success: false, error: result.error }

    } catch (error: unknown) {
      console.error('Sign-up error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Network error' }
    }
  }

  const signIn = async (data: SignInData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await axios.post('/api/auth/sign-in', data)
      const result = response.data

      if (response.status === 200) {
        setUser(result.user)
        setSessionId(result.sessionId)
        // Cookies set by backend
        return { success: true }
      }

      return { success: false, error: result.error }

    } catch (error: unknown) {
      console.error('Sign-in error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Network error' }
    }
  }

  const signOut = async (): Promise<void> => {
    try {
      if (sessionId) {
        await axios.post('/api/auth/sign-out', { sessionId })
      }

    } catch (error) {
      console.error('Sign-out error:', error)

    } finally {
      setUser(null)
      setSessionId(null)
      router.push('/')
    }
  }

  const forgotPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await axios.post('/api/auth/forgot-password', { email })
      const result = response.data
      if (response.status === 200) {
        return { success: true }
      }
      return { success: false, error: result.error }

    } catch (error: unknown) {
      console.error('Forgot password error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Network error' }
    }
  }

  const resetPassword = async (data: ResetPasswordData): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await axios.post('/api/auth/reset-password', data)
      const result = response.data
      if (response.status === 200) {
        return { success: true }
      }
      return { success: false, error: result.error }

    } catch (error: unknown) {
      console.error('Reset password error:', error)
      return { success: false, error: error instanceof Error ? error.message : 'Network error' }
    }
  }

  const value: AuthContextType = {
    user,
    sessionId,
    isLoading,
    isAuthenticated: !!user && !!sessionId,
    signUp,
    signIn,
    signOut,
    forgotPassword,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 
