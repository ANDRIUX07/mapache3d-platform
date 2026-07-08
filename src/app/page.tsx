import { LandingPage } from "@/components/landing/LandingPage";
import { FeaturedProducts } from "@/features/products/components/FeaturedProducts";

export default function HomePage() {
  return (
    <LandingPage>
      <FeaturedProducts />
    </LandingPage>
  );
}