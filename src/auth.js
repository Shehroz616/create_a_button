import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

// const bcrypt = require('bcrypt');

const getUserFromDb = async (email, pwHash) => {
  // if (email == 'abcd@gmail.com' && pwHash == '123456798') {
  //     return {
  //       id: 1,
  //       email:"abcd@gmail.com",
  //       pwHash:"123456798",
  //       name: "John Doe",
  //       image: "https://example.com/image.jpg",
  //     }
  // }
  //   const saltRounds = 10;
  //   let pwHash2 =  bcrypt.hash(pwHash, saltRounds, function(err, hash) {
  //     if (err) {
  //         console.error(err);
  //         return;
  //         // Store hash in your password DB.
  //       }
  //     console.log('Hashed password:', hash);
  //     return hash;
  // });

  let loginData = {
    email: email,
    password: pwHash,
  };

  try {
    let response = await fetch(
      `https://harri-backend-git-master-rubab786786s-projects.vercel.app/api/user/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      }
    );
    console.log("response", response);
    response = await response.json();
    return response;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        // return credentials;
        let user = null;
        user = await getUserFromDb(credentials.email, credentials.password);
        if (user.message == "Successfully logged in") {
          console.log("test",user)
          return user.data.user;
        }
        else {
          throw new Error(user);
        }
      },
    }),
  ],
  callbacks: {
    /*
     * While using jwt as a strategy, jwt() callback will be called before
     * the session() callback. So we have to add custom parameters in token
     * via jwt() callback to make them accessible in the session() callback
     */
    async jwt({ token, user }) {
      if (user) {
        console.log("user", user);
        /*
         * For adding custom parameters to user in session, we first need to add those parameters
         * in token which then will be available in the session() callback
         */
        token.role = user.role;
        token.confirmationToken = user.confirmationToken;
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // ** Add custom params to user in session which are added in jwt() callback via token parameter
        session.user.role = token.role
        session.user.confirmationToken = token.confirmationToken
      }

      return session
    }
  }
});
