
/* import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Página de login
  },
  callbacks: {
    authorized: ({ token }) => {
      // Apenas permite se o usuário estiver autenticado (token presente)
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/app/:path*",
    "/api/internal/:path*",   // Protege rotas API internas
  ],
};  */

// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: () => true, // libera tudo
  },
});

// sem matcher → nada é protegido
export const config = {};

