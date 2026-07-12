import { LandingPage } from "@/components/landing/LandingPage";
import { FeaturedProducts } from "@/features/products/components/FeaturedProducts";
import { getCurrentUser } from "@/features/auth/actions/get-current-user";

export default async function HomePage() {
  const user = await getCurrentUser();

  const currentUser = user
    ? {
        username:
          typeof user.user_metadata?.username === "string"
            ? user.user_metadata.username
            : null,

        firstName:
          typeof user.user_metadata?.first_name === "string"
            ? user.user_metadata.first_name
            : null,

        email: user.email ?? null,
      }
    : null;

  return (
    <LandingPage currentUser={currentUser}>
      <FeaturedProducts />
    </LandingPage>
  );
}