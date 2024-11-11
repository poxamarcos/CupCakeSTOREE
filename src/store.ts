import { create } from 'zustand';

interface Cupcake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
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
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: {
    cardNumber: string;
    expiryDate: string;
  };
}

interface StoreState {
  user: User | null;
  cupcakes: Cupcake[];
  cart: CartItem[];
  orders: Order[];
  users: User[];
  setUser: (user: User | null) => void;
  addCupcake: (cupcake: Cupcake) => void;
  updateCupcake: (id: string, updates: Partial<Cupcake>) => void;
  deleteCupcake: (id: string) => void;
  addToCart: (cupcake: Cupcake) => void;
  removeFromCart: (cupcakeId: string) => void;
  updateCartQuantity: (cupcakeId: string, quantity: number) => void;
  clearCart: () => void;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useStore = create<StoreState>((set) => ({
  user: null,
  cupcakes: [
    {
      id: '1',
      name: 'Classic Vanilla',
      description: 'Light and fluffy vanilla cupcake with vanilla buttercream frosting',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?w=800',
      category: 'classic',
      stock: 20
    },
    {
      id: '2',
      name: 'Double Chocolate',
      description: 'Rich chocolate cupcake with chocolate ganache',
      price: 4.49,
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800',
      category: 'chocolate',
      stock: 15
    },
    {
      id: '3',
      name: 'Red Velvet',
      description: 'Classic red velvet cupcake with cream cheese frosting',
      price: 4.29,
      image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800',
      category: 'special',
      stock: 10
    }
  ],
  cart: [],
  orders: [],
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'user@example.com',
      role: 'user'
    }
  ],

  setUser: (user) => set({ user }),

  addCupcake: (cupcake) => set((state) => ({
    cupcakes: [...state.cupcakes, cupcake]
  })),

  updateCupcake: (id, updates) => set((state) => ({
    cupcakes: state.cupcakes.map((cupcake) =>
      cupcake.id === id ? { ...cupcake, ...updates } : cupcake
    )
  })),

  deleteCupcake: (id) => set((state) => ({
    cupcakes: state.cupcakes.filter((cupcake) => cupcake.id !== id)
  })),

  addToCart: (cupcake) => set((state) => {
    const existingItem = state.cart.find((item) => item.id === cupcake.id);
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.id === cupcake.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }
    return {
      cart: [...state.cart, {
        id: cupcake.id,
        name: cupcake.name,
        price: cupcake.price,
        quantity: 1,
        image: cupcake.image
      }]
    };
  }),

  removeFromCart: (cupcakeId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== cupcakeId)
  })),

  updateCartQuantity: (cupcakeId, quantity) => set((state) => ({
    cart: state.cart.map((item) =>
      item.id === cupcakeId ? { ...item, quantity } : item
    )
  })),

  clearCart: () => set({ cart: [] }),

  addOrder: (order) => set((state) => ({
    orders: [order, ...state.orders]
  })),

  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map((order) =>
      order.id === orderId ? { ...order, status } : order
    )
  }))
}));