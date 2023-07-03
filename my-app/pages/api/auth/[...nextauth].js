import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";



export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'example@domain.com' },
          password: { label: 'Password', type: 'password' }
        },
        async authorize(credentials) {
          // Add your own authentication logic here
          const user = { id: 1, name: 'Kalpit', email: credentials.email };
          if (user) {
            return user;
          } else {
            return null;
          }
        }
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
  
  ],
  
}

export default NextAuth(authOptions)