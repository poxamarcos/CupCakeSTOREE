import { create } from 'zustand';

interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  cardNumber: string;
  expiryDate: string;
  isDefault: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  address: Address;
  paymentMethod: PaymentMethod;
}

interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  orders: Order[];
}

interface StoreState {
  user: User | null;
  cart: CartItem[];
  addAddress: (address: Address) => void;
  addPaymentMethod: (paymentMethod: PaymentMethod) => void;
  addToCart: (item: CartItem) => void;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    addresses: [],
    paymentMethods: [],
    orders: []
  },
  cart: [],
  addAddress: (address) =>
    set((state) => ({
      user: state.user ? {
        ...state.user,
        addresses: address.isDefault
          ? [
              ...state.user.addresses.map((addr) => ({
                ...addr,
                isDefault: false
              })),
              address
            ]
          : [...state.user.addresses, address]
      } : null
    })),
  addPaymentMethod: (paymentMethod) =>
    set((state) => ({
      user: state.user ? {
        ...state.user,
        paymentMethods: paymentMethod.isDefault
          ? [
              ...state.user.paymentMethods.map((method) => ({
                ...method,
                isDefault: false
              })),
              paymentMethod
            ]
          : [...state.user.paymentMethods, paymentMethod]
      } : null
    })),
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    }),
  updateCartItemQuantity: (itemId, quantity) =>
    set((state) => ({
      cart:
        quantity === 0
          ? state.cart.filter((item) => item.id !== itemId)
          : state.cart.map((item) =>
              item.id === itemId ? { ...item, quantity } : item
            )
    })),
  removeFromCart: (itemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId)
    })),
  clearCart: () => set({ cart: [] }),
  addOrder: (order) =>
    set((state) => ({
      user: state.user ? {
        ...state.user,
        orders: [order, ...state.user.orders]
      } : null
    }))
}));