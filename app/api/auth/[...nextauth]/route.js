import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import FacebookProvider from "next-auth/providers/facebook"
import connectDB from "@/db/connectDB"
import { User } from "@/models/user.models"

await connectDB();

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID || "",
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const currentUser = await User.findOne({ provider: account.provider, openId: user.id })
      if (!currentUser) {
        const newUser = new User({
          provider: account.provider,
          openId: user.id,
          email: user.email,
          username: user.email.split("@")[0],
          name: user.name,
          image: user.image,
        })
        await newUser.save()
        console.log("New User Created:", newUser)
      }
      return true
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }