import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'
import { deleteCookie } from '@/lib/cookies'
import { ClerkApiErrorResponse } from '@/types/clerk'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { sessionId } = body

        if (!sessionId) {
            return NextResponse.json(
                { error: 'Session ID is required' },
                { status: 400 }
            )
        }

        // Revoke the session using Clerk's backend API
        await axios.post(`https://api.clerk.com/v1/sessions/${sessionId}/revoke`, {}, {
            headers: {
                'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
        })

        await deleteCookie('sessionId')
        await deleteCookie('user')

        return NextResponse.json({
            success: true,
            message: 'Successfully signed out',
        })

    } catch (error) {
        const err = error as AxiosError<ClerkApiErrorResponse>
        console.error('Sign-out error:', err)
        
        const errorMessage = err.response?.data?.errors?.[0]?.message || 'Failed to sign out'
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
} 
