import { NextResponse } from "next/server";

// Assurez-vous que ces variables d'environnement sont configurées correctement
const OKTA_DOMAIN = process.env.AUTH0_ISSUER_BASE_URL; // Exemple : "dev-123456.okta.com"
const CLIENT_ID = process.env.AUTH0_CLIENT_ID;

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const loginUrl = new URL("/api/auth/login", request.url);

  // Récupère le token de session depuis les cookies
  const sessionToken = request.cookies.get("appSession");

  console.log("Cookies de la requête :", request.cookies); // Affiche tous les cookies

  // Si le chemin est protégé
  if (pathname.startsWith("/dashboard")) {
    if (!sessionToken) {
      console.log("Aucun token de session trouvé.");
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Vérifie la validité du token via l'API Okta
      const response = await fetch(`https://${OKTA_DOMAIN}/oauth2/v1/introspect`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${CLIENT_ID}:F3EIFvBSAGcWP1oIdwPFXgZ0Iboe92V4`).toString('base64')}`, // Encode les identifiants du client
        },
        body: new URLSearchParams({
          token: sessionToken,
          token_type_hint: "access_token",
        }),
      });

      const data = await response.json();

      if (!data.active) {
        console.log("Token non valide ou expiré.");
        return NextResponse.redirect(loginUrl);
      }

      console.log("Utilisateur authentifié :", data.sub);
    } catch (error) {
      console.error("Erreur d'authentification :", error);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
