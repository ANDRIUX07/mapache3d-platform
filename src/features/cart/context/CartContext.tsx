"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { CartContextType, CartItem } from "../types";

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "mapache3d_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);

    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function addItem(item: CartItem) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (currentItem) => currentItem.id === item.id
      );

      if (existingItem) {
        return currentItems.map((currentItem) =>
          currentItem.id === item.id
            ? {
                ...currentItem,
                quantity: currentItem.quantity + item.quantity,
              }
            : currentItem
        );
      }

      return [...currentItems, item];
    });

    
  }

  function removeItem(id: string) {
    setItems((currentItems) =>
      currentItems.filter((currentItem) => currentItem.id !== id)
    );
  }

  function increaseQuantity(id: string) {
    setItems((currentItems) =>
      currentItems.map((currentItem) =>
        currentItem.id === id
          ? { ...currentItem, quantity: currentItem.quantity + 1 }
          : currentItem
      )
    );
  }

  function decreaseQuantity(id: string) {
    setItems((currentItems) =>
      currentItems
        .map((currentItem) =>
          currentItem.id === id
            ? { ...currentItem, quantity: currentItem.quantity - 1 }
            : currentItem
        )
        .filter((currentItem) => currentItem.quantity > 0)
    );
  }

  function clearCart() {
    setItems([]);
  }

  function openCart() {
    setIsCartOpen(true);
  }

  function closeCart() {
    setIsCartOpen(false);
  }

  function toggleCart() {
    setIsCartOpen((current) => !current);
  }

  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    subtotal,
    isCartOpen,
    openCart,
    closeCart,
    toggleCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}