// import { NextRequest, NextResponse } from 'next/server'
// import axios, { AxiosError } from 'axios'
// import { ClerkApiErrorResponse } from '@/types/clerk'

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json()
//         const { email, code, newPassword } = body

//         if (!email || !code || !newPassword) {
//             return NextResponse.json(
//                 { error: 'Email, code, and new password are required' },
//                 { status: 400 }
//             )
//         }

//         // Find user to get their ID for the reset call
//         const userResponse = await axios.get(`https://api.clerk.com/v1/users?email_address=${email}`, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//             },
//         })

//         const users = userResponse.data
//         if (users.length === 0) {
//             return NextResponse.json({ error: 'User not found' }, { status: 404 })
//         }
//         const userId = users[0].id

//         // Attempt to complete the password reset
//         const r = await axios.post(`https://api.clerk.com/v1/users/${userId}/passwords`, {
//             password: newPassword,
//             password_check_code: code,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//             },
//         })

//         console.log(r.data)

//         return NextResponse.json({
//             success: true,
//             message: 'Password reset successful',
//         })

//     } catch (error) {

//         const err = error as AxiosError<ClerkApiErrorResponse>
//         console.error('Reset password error:', err.response?.data)

//         const apiError = err.response?.data?.errors?.[0]
//         let errorMessage = apiError?.message || 'Authentication failed'

//         if (apiError?.code === 'form_code_incorrect') {
//             errorMessage = 'Invalid verification code';
//         }

//         return NextResponse.json(
//             { error: errorMessage },
//             { status: err.response?.status || err.status }
//         )
//     }
// } 
