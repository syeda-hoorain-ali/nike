// import { NextRequest, NextResponse } from 'next/server'
// import axios, { AxiosError } from 'axios'
// import { ClerkApiErrorResponse } from '@/types/clerk'

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json()
//         const { email } = body

//         if (!email) {
//             return NextResponse.json(
//                 { error: 'Email is required' },
//                 { status: 400 }
//             )
//         }

//         const r = await axios.post('https://api.clerk.com/v1/users/passwords', {
//             email_address: email,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//             }
//         })

//         console.log(r.data)

//         return NextResponse.json({
//             success: true,
//             message: 'Password reset email sent',
//         })
//     } catch (error) {

//         const err = error as AxiosError<ClerkApiErrorResponse>
//         console.error('Forgot password error:', err.response?.data || err.message)

//         if (err.response?.data?.errors?.[0]?.code === 'form_identifier_not_found') {
//             // Don't reveal that the user doesn't exist
//             return NextResponse.json({ success: true, message: 'Password reset email sent if user exists' })
//         }
//         return NextResponse.json(
//             { error: 'Failed to send password reset email' },
//             { status: 500 }
//         )
//     }
// } 
