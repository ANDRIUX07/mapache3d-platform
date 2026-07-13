import { OrderDetails } from "@/features/orders/components/OrderDetails";

interface AccountOrderPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function AccountOrderPage({
  params,
}: AccountOrderPageProps) {
  const { orderId } = await params;

  return (
    <main className="min-h-screen bg-[#050509] px-4 py-10 text-white sm:px-6 lg:px-8">
      <section className="mx-auto w-full max-w-5xl">
        <OrderDetails orderId={orderId} />
      </section>
    </main>
  );
}