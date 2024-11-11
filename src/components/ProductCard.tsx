import React from 'react';
import { useStore } from '../store';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock: number;
}

export function ProductCard({ id, name, description, price, image, stock }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const cupcakes = useStore((state) => state.cupcakes);
  
  const handleAddToCart = () => {
    const cupcake = cupcakes.find((c) => c.id === id);
    if (cupcake) {
      addToCart(cupcake);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-pink-600">${price.toFixed(2)}</span>
          <span className="text-sm text-gray-500">{stock} left</span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`mt-4 w-full flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium
            ${stock > 0 
              ? 'bg-pink-600 text-white hover:bg-pink-700' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}