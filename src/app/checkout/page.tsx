import { redirect } from "next/navigation";

import { CheckoutForm } from "@/features/checkout/components/CheckoutForm";
import { getCurrentUser } from "@/features/auth/actions/get-current-user";

export default async function CheckoutPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?redirectTo=/checkout");
  }

  return <CheckoutForm />;
}