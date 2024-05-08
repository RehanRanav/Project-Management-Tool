import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const authConfig: NextAuthOptions = {
  pages:{
    signIn: "/"
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email address",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const user = { id: "1", name: "J Smith", email: "user@nextmail.com",image: "https://gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200" };
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        if (
          credentials.email === user.email &&
          credentials.password === "123456"
        ) {
          return user as User;
        }
        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export async function loginIsRequiredServer() {
  const session = await getServerSession(authConfig);
  if(!session) return("/");
}
export async function loginIsRequiredClient() {
  if(typeof window !== "undefined"){
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const session = useSession();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();
    if(!session) router.push("/");
  }
}
