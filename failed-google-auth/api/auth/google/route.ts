// import { NextRequest, NextResponse } from 'next/server'
// import axios from 'axios'
// import { client } from '@/sanity/lib/client'
// import { Clerk, } from "@clerk/clerk-js"

// export async function GET(request: NextRequest) {
//     try {

//         const clerk = new Clerk(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!)

//         const a = await clerk.handleRedirectCallback()
//         console.log(a)

//         // console.info("Request on Google route")
//         // console.log(request.headers)
//         // console.log(request)


//         // const { searchParams } = new URL(request.url)
//         // const code = searchParams.get('code')
//         // const redirectUri = process.env.NEXT_PUBLIC_CLERK_AUTHORIZE_REDIRECT_URI
//         // if (!code || !redirectUri) {
//         //     return NextResponse.redirect(new URL('/sign-in', request.url))
//         // }

//         // // Exchange code for tokens with Clerk
//         // const tokenRes = await axios.post('https://api.clerk.com/v1/oauth/token', {
//         //     provider: 'google',
//         //     code,
//         //     redirect_uri: redirectUri,
//         //     client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         //     client_secret: process.env.GOOGLE_SECRET_KEY,
//         // }, {
//         //     headers: {
//         //         'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//         //     },
//         // })

//         // const { session_id, user_id } = tokenRes.data

//         // // Get user details from Clerk
//         // const userRes = await axios.get(`https://api.clerk.com/v1/users/${user_id}`, {
//         //     headers: {
//         //         'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
//         //     },
//         // })
//         // const userData = userRes.data

//         // // Save user in Sanity (if not already present)
//         // await client.createIfNotExists({
//         //     _type: 'users',
//         //     _id: userData.id,
//         //     userId: userData.id,
//         //     username: userData.username,
//         //     firstName: userData.first_name,
//         //     lastName: userData.last_name,
//         //     fullName: `${userData.first_name} ${userData.last_name}`,
//         //     email: userData.email_addresses[0]?.email_address,
//         //     createdAt: new Date().toISOString(),
//         //     updatedAt: new Date().toISOString(),
//         // })

//         // Set cookies for sessionId and user using NextResponse
//         const response = NextResponse.redirect(new URL('/join-us', request.url))
//         // response.cookies.set('sessionId', session_id, { httpOnly: true, path: '/' })
//         // response.cookies.set('user', JSON.stringify({
//         //     id: userData.id,
//         //     email: userData.email_addresses[0]?.email_address,
//         //     firstName: userData.first_name,
//         //     lastName: userData.last_name,
//         //     username: userData.username,
//         // }), { httpOnly: true, path: '/' })
//         return response
//     } catch (error: any) {
//         console.error('Google OAuth callback error:', error.response?.data || error.message)
//         return NextResponse.redirect(new URL('/sign-in', request.url))
//     }
// }



// // export async function POST(request: NextRequest) {
// //     try {

// //         console.info("Request on Google route with POST method")
// //         console.log(request)

// //         const response = NextResponse.redirect(new URL('/', request.url))
// //         return response
// //     } catch (error: any) {
// //         console.error('Google OAuth callback error:', error.response?.data || error.message)
// //         return NextResponse.redirect(new URL('/sign-in', request.url))
// //     }
// // } 
