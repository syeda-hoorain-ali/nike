
// interface AuthContextType {
// 	// ... remaining properties
// 	signInWithGoogle: () => Promise<{ success: boolean; error?: string }>
// }


//   const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
//     try {

//       await clerkSignIn?.authenticateWithRedirect({
//         strategy: "oauth_google",
//         redirectUrl: "/api/auth/google",
//         redirectUrlComplete: "/",
//       })

//       // if (response.status === 200) {
//       //   setUser(result.user)
//       //   setSessionId(result.sessionId)
//       //   // Cookies set by backend
//         return { success: true }
//       // } else {
//       //   return { success: false, error: result.error }
//       // }
//     } catch (error: any) {
//       console.error('Google sign-in error:', error)
//       return { success: false, error: error.errors[0]?.message || 'Network error' }
//     }
//   }
