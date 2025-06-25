// import { NextRequest, NextResponse } from 'next/server'
// import axios, { AxiosError } from 'axios'
// import { ClerkApiErrorResponse } from '@/types/clerk'

// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json()
//         const { email, password } = body

//         // Validate required fields
//         if (!email || !password) {
//             return NextResponse.json(
//                 { error: 'Email and password are required' },
//                 { status: 400 }
//             )
//         }

//         // Use Clerk's backend API directly
//         const { data: result, headers } = await axios.post('https://api.clerk.com/v1/sessions/create_with_password', {
//             identifier: email,
//             password,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//             },
//         })

//         console.log("Session response: ", result)
//         console.log("Session headers: ", headers)


//         // // Verify user's password
//         // const { data: { verified } } = await axios.post(`https://api.clerk.com/v1/users/${result.user_id}/verify_password`, {
//         //     password,
//         // }, {
//         //     headers: {
//         //         'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//         //     },
//         // })
//         // // https://api.clerk.com/v1/users/{user_id}/verify_password


//         // Get user details
//         const userResponse = await axios.get(`https://api.clerk.com/v1/users/${result.user_id}`, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//             },
//         })

//         const userData = userResponse.data

//         return NextResponse.json({
//             success: true,
//             sessionId: result.id,
//             user: {
//                 id: userData.id,
//                 email: userData.email_addresses[0]?.email_address,
//                 firstName: userData.first_name,
//                 lastName: userData.last_name,
//                 username: userData.username,
//             },
//         })

//     } catch (error) {
//         const err = error as AxiosError<ClerkApiErrorResponse>
//         console.error('Sign-in error:', err.response?.data)
        
//         const apiError = err.response?.data?.errors?.[0]
//         let errorMessage = apiError?.message || 'Authentication failed'

//         if (apiError?.code === 'form_identifier_not_found' || apiError?.code === 'form_password_incorrect') {
//             errorMessage = 'Invalid credentials'
//         }

//         return NextResponse.json(
//             { error: errorMessage },
//             { status: err.response?.status || err.status }
//         )
//     }
// } 
