// import { NextRequest, NextResponse } from 'next/server'
// import { client } from '@/sanity/lib/client'
// import axios, { AxiosError } from 'axios'
// import { setCookie } from '@/lib/cookies'
// import { ClerkApiErrorResponse } from '@/types/clerk'


// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json()
//         const { email, password, firstName, lastName, username, dateOfBirth, country, gender, emailConsesnt } = body

//         // Validate required fields
//         if (
//             !email ||
//             !password ||
//             !firstName ||
//             !lastName ||
//             !username ||
//             !dateOfBirth ||
//             !country ||
//             !gender ||
//             !emailConsesnt
//         ) {
//             return NextResponse.json(
//                 { error: 'Missing required fields' },
//                 { status: 400 }
//             )
//         }

//         const response = await axios.post('https://api.clerk.com/v1/users', {
//             email_address: [email],
//             password,
//             first_name: firstName,
//             last_name: lastName,
//             username,
//             public_metadata: {
//                 username,
//             },
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//             },
//         })

//         const result = response.data
//         console.log("result; ", result)

//         // Create user in Sanity
//         await client.create({
//             _type: 'users',
//             _id: result.id,
//             userId: result.id,
//             username,
//             firstName,
//             lastName,
//             fullName: `${firstName} ${lastName}`,
//             imageUrl: result.image_url,
//             email,
//             dateOfBirth,
//             gender,
//             country,
//             preferences: { newsletterSubscription: emailConsesnt },
//             createdAt: new Date().toISOString(),
//             updatedAt: new Date().toISOString(),
//             lastLogin: new Date().toISOString(),
//         })


//         // Create session
//         const sessionResponse = await axios.post('https://api.clerk.com/v1/sessions', {
//             user_id: result.id,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//             },
//         })

//         const sessionId = sessionResponse.data.id
//         console.log("session: ", sessionResponse.data)

//         // Set cookies for session and user (same as sign-in)
//         await setCookie('sessionId', sessionId, { path: '/', httpOnly: false })

//         await setCookie('user', encodeURIComponent(JSON.stringify({
//             id: result.id,
//             email: result.email_addresses[0]?.email_address,
//             firstName: result.first_name,
//             lastName: result.last_name,
//             username: result.username,
//         })), { path: '/', httpOnly: false })


//         return NextResponse.json({
//             success: true,
//             sessionId: sessionId,
//             user: {
//                 id: result.id,
//                 email: result.email_addresses[0]?.email_address,
//                 firstName: result.first_name,
//                 lastName: result.last_name,
//                 username: result.username,
//             },
//         })

//     } catch (error) {
//         const err = error as AxiosError<ClerkApiErrorResponse>
//         console.error('Sign-up error:', err)

//         const apiError = err.response?.data?.errors?.[0]
//         if (apiError?.code === 'form_identifier_exists') {
//             return NextResponse.json(
//                 { error: 'User with this email already exists' },
//                 { status: 409 }
//             )
//         }

//         const errorMessage = apiError?.message || 'Failed to create user'
//         return NextResponse.json(
//             { error: errorMessage },
//             { status: 500 }
//         )
//     }
// } 
