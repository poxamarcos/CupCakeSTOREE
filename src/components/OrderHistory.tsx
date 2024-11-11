import React from 'react';
import { Package } from 'lucide-react';
import { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders = [] }: OrderHistoryProps) {
  if (!orders.length) {
    return (
      <div className="text-center py-8">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No Orders Yet</h3>
        <p className="text-gray-500 mt-2">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-900">Order #{order.id}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-sm capitalize
              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'}`}>
              {order.status}
            </span>
          </div>
          <div className="space-y-2">
            {order.items?.map((item) => (
              <div key={`${order.id}-${item.id}`} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.quantity}x {item.name}
                </span>
                <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <span className="font-medium text-gray-900">Total</span>
            <span className="font-bold text-pink-600">${order.total.toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}