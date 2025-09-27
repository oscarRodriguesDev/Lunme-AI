// middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Página de login
  },
  callbacks: {
    authorized: ({ token }) => {
      // Só permite se o usuário estiver autenticado
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/app/:path*",        // protege toda a área logada
    "/api/internal/:path*", // protege apenas APIs internas
  ],
};
 

// middleware.ts
/* import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: () => true, // libera tudo
  },
});

// sem matcher → nada é protegido
export const config = {}; */

