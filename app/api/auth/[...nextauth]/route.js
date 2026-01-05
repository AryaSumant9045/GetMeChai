// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GitHubProvider from 'next-auth/providers/github'

import connectDB from '@/db/Connectdb'
import User from '@/models/User'
import Payment from '@/models/Payment'
// NOTE: importing app pages inside API routes can cause unexpected bundling/circular issues.
// You asked to keep additional import; if this causes trouble, comment it out.
// import Username from '@/app/[username]/page'

const options = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    secret: process.env.NEXTAUTH_SECRET,

    trustHost: true, // 🔥🔥 THIS FIXES OAuthSignin on Vercel
    // other providers (kept commented as requested)
  ],

  callbacks: {
    // signIn is called when user signs in. Use it to create/check DB user.
    async signIn({ user, account, profile, email, credentials }) {
      try {
        // Ensure DB connected
        await connectDB()

        // email is available on user.email
        const userEmail = user?.email || (email && (typeof email === 'string' ? email : email?.email))

        if (!userEmail) {
          // if no email, don't create user (or handle per your needs)
          return true
        }

        // check if user already exists
        const currentUser = await User.findOne({ email: userEmail }).exec()

        if (!currentUser) {
          // create new user
          const username = userEmail.split('@')[0]
          const newUser = await User.create({
            email: userEmail,
            username,
            name: user?.name || username,
            image: user?.image || undefined,
          })
          // modify returned NextAuth user object if you want
          user.name = newUser.username
        } else {
          // existing user -> set name to stored username
          user.name = currentUser.username
        }

        return true
      } catch (err) {
        console.error('signIn callback error:', err)
        // return false if sign-in should be rejected
        return false
      }
    },

    // session callback: called whenever a session is checked/created
    async session({ session, token, user }) {
      try {
        await connectDB()
        const dbUser = await User.findOne({ email: session.user?.email }).exec()
        if (dbUser) {
          session.user.name = dbUser.username || session.user.name
          session.user.id = dbUser._id.toString()
          // attach any other props you want
        }
        return session
      } catch (err) {
        console.error('session callback error:', err)
        return session
      }
    },
  },

  // you can add other NextAuth options (pages, session, jwt, etc.) here
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }
