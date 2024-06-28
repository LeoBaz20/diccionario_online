import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const { compare } = require('bcrypt');
const prisma = require('./prisma');

const authConfig = {
  providers: [
    {
      id: 'credentials',
      name: 'Sign in',
      credentials: {
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
      },
    },
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

module.exports = authConfig;
