export interface CartItem {
  id: string;
  name: string;
  slug?: string;

  price: number;
  quantity: number;

  image?: string;

  category?: string;

  material?: string;

  stock?: number;
}

export interface CartState {
  items: CartItem[];
}

export interface CartContextType {
  items: CartItem[];

  addItem: (item: CartItem) => void;

  removeItem: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;

  totalItems: number;

  subtotal: number;

  isCartOpen: boolean;

  openCart: () => void;

  closeCart: () => void;

  toggleCart: () => void;
}