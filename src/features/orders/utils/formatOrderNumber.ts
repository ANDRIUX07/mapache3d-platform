export function formatOrderNumber(
  orderNumber: string | null | undefined
): string {
  if (!orderNumber) {
    return "Pedido sin número";
  }

  return orderNumber.trim().toUpperCase();
}