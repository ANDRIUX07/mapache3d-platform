import { notFound } from "next/navigation";

import { AdminOrderDetails } from "@/features/admin/components/AdminOrderDetails";
import { getAdminOrder } from "@/features/admin/orders/services/getAdminOrder";

interface AdminOrderPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function AdminOrderPage({
  params,
}: AdminOrderPageProps) {
  const { orderId } = await params;

  const order = await getAdminOrder(orderId);

  if (!order) {
    notFound();
  }

  return (
    <AdminOrderDetails order={order} />
  );
}