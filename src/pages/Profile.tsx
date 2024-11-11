import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStore } from '../store';
import { AddressCard } from '../components/AddressCard';
import { PaymentMethodCard } from '../components/PaymentMethodCard';
import { OrderHistory } from '../components/OrderHistory';

export default function Profile() {
  const location = useLocation();
  const user = useStore((state) => state.user);
  const orders = useStore((state) => state.orders);
  const addAddress = useStore((state) => state.addAddress);
  const removeAddress = useStore((state) => state.removeAddress);
  const setDefaultAddress = useStore((state) => state.setDefaultAddress);
  const addPaymentMethod = useStore((state) => state.addPaymentMethod);
  const removePaymentMethod = useStore((state) => state.removePaymentMethod);
  const setDefaultPaymentMethod = useStore((state) => state.setDefaultPaymentMethod);

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'payments'>('orders');

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'orders'
                    ? 'border-b-2 border-pink-500 text-pink-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Order History
              </button>
              <button
                onClick={() => setActiveTab('addresses')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'addresses'
                    ? 'border-b-2 border-pink-500 text-pink-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Addresses
              </button>
              <button
                onClick={() => setActiveTab('payments')}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === 'payments'
                    ? 'border-b-2 border-pink-500 text-pink-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Payment Methods
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'orders' && (
              <OrderHistory orders={orders || []} />
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-4">
                {user.addresses?.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isDefault={address.isDefault}
                    onSetDefault={() => setDefaultAddress(address.id)}
                    onDelete={() => removeAddress(address.id)}
                  />
                ))}
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-4">
                {user.paymentMethods?.map((paymentMethod) => (
                  <PaymentMethodCard
                    key={paymentMethod.id}
                    paymentMethod={paymentMethod}
                    isDefault={paymentMethod.isDefault}
                    onSetDefault={() => setDefaultPaymentMethod(paymentMethod.id)}
                    onDelete={() => removePaymentMethod(paymentMethod.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}