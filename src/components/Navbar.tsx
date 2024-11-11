import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { ShoppingBag, User, LogOut, Cake } from 'lucide-react';

export default function Navbar() {
  const { user, cart } = useStore();
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Cake className="h-8 w-8 text-pink-500" />
            <span className="text-xl font-bold text-gray-800">Cupcake Store</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/shop" className="text-gray-600 hover:text-pink-500">
              Shop
            </Link>
            
            {user ? (
              <>
                <Link to="/cart" className="relative text-gray-600 hover:text-pink-500">
                  <ShoppingBag className="h-6 w-6" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.length}
                    </span>
                  )}
                </Link>
                <Link to="/orders" className="text-gray-600 hover:text-pink-500">
                  Orders
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-pink-500">
                  Profile
                </Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-600 hover:text-pink-500">
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    useStore.getState().setUser(null);
                    navigate('/');
                  }}
                  className="text-gray-600 hover:text-pink-500"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-pink-500">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}