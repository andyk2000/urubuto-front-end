/* eslint-disable prettier/prettier */
import CredentialsProvider from "next-auth/providers/credentials";
import { axiosConfig } from "@/api.config/axios.config";
import type { NextAuthOptions } from "next-auth";

export const nextOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axiosConfig.post("/user/login", {
            email: credentials?.email,
            password: credentials?.password,
          });
          const user = res.data;
          console.log("user+++", user);
          if (res && user) {
            return { id: "id", access_token: user.token };
          }
          return null;
        } catch (error: any) {
          console.log("error+++++", error.response.data);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
    newUser: "/sign-up",
    signOut: "/merchant",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.access_token = (user as any).access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.access_token = token.access_token;
      }
      return session;
    },
  },
};
