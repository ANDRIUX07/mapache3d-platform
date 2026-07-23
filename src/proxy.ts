import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          /*
           * Actualizamos las cookies de la solicitud para que los
           * Server Components reciban inmediatamente la sesión renovada.
           */
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          /*
           * También enviamos las cookies renovadas al navegador.
           */
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  /*
   * Valida criptográficamente el token y renueva la sesión cuando
   * sea necesario.
   *
   * No usar getSession() para tomar decisiones de autorización,
   * porque solo lee la sesión almacenada sin volver a validarla.
   */
  const {
    data: claimsData,
    error: claimsError,
  } = await supabase.auth.getClaims();

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith("/admin");

  /*
   * Las rutas públicas no exigen autenticación.
   * La llamada anterior permite mantener actualizada la sesión
   * para el header, carrito, cuenta y demás Server Components.
   */
  if (!isAdminRoute) {
    return response;
  }

  const userId = claimsData?.claims?.sub;

  /*
   * Si el token no existe, expiró o no pudo validarse,
   * enviamos al usuario al login.
   */
  if (claimsError || !userId) {
    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("redirectTo", pathname);

    return NextResponse.redirect(loginUrl);
  }

  /*
   * La autenticación no es suficiente: verificamos que el usuario
   * autenticado tenga realmente el rol de administrador.
   *
   * Esta consulta también debe estar protegida mediante RLS.
   */
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  /*
   * Ante cualquier error o rol diferente de admin, denegamos
   * el acceso. No permitimos el acceso si la comprobación falla.
   */
  if (profileError || profile?.role !== "admin") {
    const homeUrl = request.nextUrl.clone();

    homeUrl.pathname = "/";
    homeUrl.search = "";

    return NextResponse.redirect(homeUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Ejecutamos el Proxy en todas las rutas de la aplicación para
     * mantener actualizadas las cookies de autenticación.
     *
     * Excluimos archivos estáticos e imágenes para evitar trabajo
     * innecesario.
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};