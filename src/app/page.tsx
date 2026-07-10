import { LandingPage } from "@/components/landing/LandingPage";
import { FeaturedProducts } from "@/features/products/components/FeaturedProducts";
import { CartButton } from "@/features/cart/components/CartButton";

export default function HomePage() {
  return (
    <>
      <div className="fixed top-6 right-6 z-50">
        <CartButton />
      </div>

      <LandingPage>
        <FeaturedProducts />
      </LandingPage>
    </>
  );
}