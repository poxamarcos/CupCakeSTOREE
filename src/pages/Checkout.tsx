import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { CartSummary } from '../components/CartSummary';
import { CheckoutForm } from '../components/CheckoutForm';
import type { CheckoutFormData } from '../components/CheckoutForm';

export default function Checkout() {
  const navigate = useNavigate();
  const { user, cart, clearCart, addOrder } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!cart || cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const handleSubmit = async (formData: CheckoutFormData) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);

    try {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // Create the order
      const order = {
        id: Math.random().toString(36).substr(2, 9),
        user_id: user.id,
        total,
        status: 'pending' as const,
        created_at: new Date().toISOString(),
        shipping_address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode
        },
        payment_method: {
          lastFourDigits: formData.cardNumber.slice(-4),
          expiryDate: formData.expiryDate
        },
        order_items: cart.map(item => ({
          id: Math.random().toString(36).substr(2, 9),
          quantity: item.quantity,
          price: item.price,
          cupcake: {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            description: '',
            category: '',
            stock: 0
          }
        }))
      };

      // Add order to store
      addOrder(order);

      // Clear cart and redirect
      clearCart();
      navigate('/order-success');
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <CheckoutForm onSubmit={handleSubmit} disabled={loading} />
          </div>
        </div>

        <div>
          <CartSummary
            items={cart}
            showCheckoutButton={false}
          />
        </div>
      </div>
    </div>
  );
}