import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {compare} from 'bcrypt';
import prisma from "./prisma";

export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
        async authorize(credentials) {
          if (!credentials || !credentials.email || !credentials.password)
            return null;

          // Consultar el usuario en la base de datos con Prisma
          const dbUser = await prisma.user.findUnique({
            where: { email: credentials.email },
          });


          if (!dbUser) {
            return null; // El usuario no existe
          }

          // Comparar la contraseña ingresada con la almacenada en la base de datos
          const isPasswordValid = await compare(
            credentials.password,
            dbUser.password
          );

          if (!isPasswordValid) {
            return null; // Contraseña incorrecta
          }

          // Excluir la contraseña del objeto de usuario retornado
          const { password, ...userWithoutPassword } = dbUser;

          console.log(userWithoutPassword);
          return userWithoutPassword;
        },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authConfig)
