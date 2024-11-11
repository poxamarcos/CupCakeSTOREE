import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();

  const handleViewOrders = () => {
    navigate('/profile', { state: { activeTab: 'orders' } });
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
        <p className="text-gray-600">Thank you for your order. We'll start preparing it right away!</p>
        <div className="pt-4 space-y-2">
          <button
            onClick={handleViewOrders}
            className="w-full px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            View Order Status
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="w-full px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}