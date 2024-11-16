import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

const getUserFromDb = (email, pwHash) => {
  // logic to get user from database
  if (email == 'abcd@gmail.com' && pwHash == '123456798') {
      return {
        id: 1,
        email:"abcd@gmail.com",
        pwHash:"123456798",
        name: "John Doe",
        image: "https://example.com/image.jpg",
      }
  }
}
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null
 
        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password)

 
        // logic to verify if the user exists
        user = await getUserFromDb(credentials.email, credentials.password)
 
        if (!user) {
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
  
})