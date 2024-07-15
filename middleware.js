// middleware.js
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { OktaAuth } from "@okta/okta-auth-js";
import oktaConfig from "./oktaConfig";

const oktaAuth = new OktaAuth(oktaConfig);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Si le chemin commence par /dashboard, nous devons vérifier l'authentification
  if (pathname.startsWith("/dashboard")) {
    // Récupère le token de session Okta depuis les cookies
    const sessionToken = request.cookies.get("okta-session-token");

    // Si aucun token de session n'est trouvé, redirige l'utilisateur vers la page de login
    if (!sessionToken) {
      return NextResponse.redirect(new URL("./api/auth/login", request.url));
    }

    try {
      // Vérifie la validité du token de session
      await oktaAuth.token.verify(sessionToken);

      // Vérifie les informations de l'utilisateur à l'aide du token de session
      const user = await oktaAuth.token.getUserInfo(sessionToken);
      // Si les informations de l'utilisateur ne sont pas valides, redirige vers la page de login
      if (!user) {
        return NextResponse.redirect(new URL("./api/auth/login", request.url));
      }
    } catch (error) {
      // En cas d'erreur lors de la vérification, logge l'erreur et redirige vers la page de login
      console.error("Authentication error:", error);
      return NextResponse.redirect(new URL("./api/auth/login", request.url));
    }
  } else {
    // Si le chemin n'est pas protégé, vérifie si l'utilisateur est authentifié
    const sessionToken = request.cookies.get("okta-session-token");
    if (sessionToken) {
      try {
        await oktaAuth.token.verify(sessionToken);
      } catch (error) {
        // Si le token de session est invalide, supprime le cookie et redirige vers la page de login
        request.cookies.delete("okta-session-token", { httpOnly: true, secure: true });
        return NextResponse.redirect(new URL("./api/auth/login", request.url));
      }
    }
  }

  // Si le chemin n'est pas protégé ou si l'utilisateur est authentifié, continue la requête
  return NextResponse.next();
}

// Spécifie quelles routes doivent utiliser ce middleware
export const config = {
  matcher: ["/dashboard/:path*"],
};