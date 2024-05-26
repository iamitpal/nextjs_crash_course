import connectDB from "@/config/database";
import User from "@/models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      // connect to database
      await connectDB();
      // check if user exists
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        //Truncate user name if too long
        const username = profile.name.slice(0, 20);
        // create user in database
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });

        // return true to sign in user
        return true;
      }
    },

    //Modifies the session object
    async session({ session }) {
      //get user from db
      const user = await User.findOne({ email: session.user.email });
      //assign the user id to session
      session.user.id = user._id.toString();
      return session;
    },
  },
};

export default authOptions;
