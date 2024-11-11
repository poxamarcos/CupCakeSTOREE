import React, { useState } from 'react';
import { useStore } from '../store';

interface AddressFormProps {
  onSubmit: () => void;
  buttonText: string;
}

export function AddressForm({ onSubmit, buttonText }: AddressFormProps) {
  const { user, addAddress } = useStore();
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    isDefault: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newAddress = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      isDefault: user?.addresses?.length === 0 ? true : formData.isDefault
    };

    addAddress(newAddress);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="street" className="block text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          type="text"
          id="street"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
          value={formData.street}
          onChange={(e) => setFormData({ ...formData, street: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            id="zipCode"
            required
            pattern="[0-9]{5}"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500"
            value={formData.zipCode}
            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value.replace(/\D/g, '') })}
          />
        </div>
      </div>

      {user?.addresses?.length > 0 && (
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isDefault"
            className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
            checked={formData.isDefault}
            onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
          />
          <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
            Set as default address
          </label>
        </div>
      )}

      <button
        type="submit"
        className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
      >
        {buttonText}
      </button>
    </form>
  );
}