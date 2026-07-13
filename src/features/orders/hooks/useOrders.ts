"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import { getOrders } from "../services/getOrders";
import type { Order } from "../types";

interface UseOrdersReturn {
  orders: Order[];
  isLoading: boolean;
  error: string | null;
  refreshOrders: () => Promise<void>;
}

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getOrders();

      setOrders(data);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "No se pudieron cargar los pedidos.";

      setError(message);
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshOrders();
  }, [refreshOrders]);

  return {
    orders,
    isLoading,
    error,
    refreshOrders,
  };
}