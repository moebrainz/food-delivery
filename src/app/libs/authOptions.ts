import client from "@/app/libs/mongoConnect";
import { mongoConnect } from "@/app/libs/utils/mongoConnect";
import { User } from "@/app/models/User";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcrypt";
import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phoneNumber?: string | null;
      postalCode?: string | null;
      address?: string | null;
      city?: string | null;
      country?: string | null;
      admin?: boolean | null;
    };
  }
}

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  adapter: MongoDBAdapter(client),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "myemail@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // const { email, password } = credentials;

        console.log(credentials);

        const email = credentials?.email || "";
        const password = credentials?.password || "";

        //connect to mongodb
        await mongoConnect();
        // mongoose.connect(process.env.MONGO_URL || "");
        const user = await User.findOne({ email });

        //compare user password with database
        const passwordOk = user && bcrypt.compareSync(password, user.password);

        console.log({ passwordOk });

        // Return null if user data is invalid
        if (!user) return null;

        // if (passwordOk) {
        //   return { ...user };
        // }
        if (passwordOk) {
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
          };
        }

        // Explicitly return null if password is incorrect
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      await mongoConnect();

      if (token?.id && session.user) {
        //fetch session from latest user data
        const user = await User.findById(token.id);

        session.user.id = String(token.id);
        session.user.email = token.email;
        session.user.name = user?.name || session.user.name;
        session.user.image = user?.image || session.user.image;
        session.user.phoneNumber =
          user?.phoneNumber || session.user.phoneNumber;
        session.user.address = user?.address || session.user.address;
        session.user.postalCode = user?.postalCode || session.user.postalCode;
        session.user.city = user?.city || session.user.city;
        session.user.country = user?.country || session.user.country;
        session.user.admin = user?.admin || session.user.admin;
      }

      console.log("this is a sesion:", session.user.image);

      return session;
    },
  },
};
